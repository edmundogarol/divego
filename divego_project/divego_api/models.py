from django.db import models
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.utils import timezone

from rest_framework import exceptions

from storages.backends.s3boto3 import S3Boto3Storage

from .constants import *

class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        try:
            validate_email(email)
        except ValidationError as e:
            raise exceptions.ValidationError(
                {"email": "Invalid format. Check and try again."}
            )
        else:
            email = self.normalize_email(email)
            user = self.model(email=email, **extra_fields)
            user.set_password(password)
            user.save(using=self._db)
            return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class Roles(models.Model):

    DIVER = 1
    INSTRUCTOR = 2
    STORE = 3
    STAFF = 4

    ROLES = (
        (DIVER, "diver"),
        (INSTRUCTOR, "instructor"),
        (STORE, "store"),
        (STAFF, "staff"),
    )

    id = models.PositiveSmallIntegerField(choices=ROLES, primary_key=True)
    name = models.TextField(max_length=20, blank=True)

    def __str__(self):
        return self.get_id_display()


class Privileges(models.Model):

    SUPER = 1
    ADMIN = 2

    PRIVILEGES = (
        (SUPER, "super"),
        (ADMIN, "admin"),
    )

    id = models.PositiveSmallIntegerField(choices=PRIVILEGES, primary_key=True)
    name = models.TextField(max_length=20, blank=True)

    def __str__(self):
        return self.get_id_display()

class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.TextField(max_length=50, blank=False, unique=True)
    first_name = models.TextField(max_length=50, blank=True)
    last_name = models.TextField(max_length=50, blank=True)
    username = models.TextField(max_length=50, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateTimeField(null=True, blank=True)
    roles = models.ManyToManyField(Roles, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(null=True)
    privileges = models.ManyToManyField(Privileges, blank=True)
    verified = models.TextField(max_length=50, blank=False, null=True)
    last_ip = models.TextField(max_length=30, blank=False, null=True)
    image = models.ImageField(upload_to="user_profile", null=True)
    image_public = models.ImageField(
        storage=S3Boto3Storage(bucket_name="divego-resources"),
        upload_to="user_profile_public",
        null=True,
    )

    objects = UserManager()

    USERNAME_FIELD = "email"