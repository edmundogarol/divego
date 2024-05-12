import pytz

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
from django.contrib.postgres.fields import ArrayField

from rest_framework import exceptions

from storages.backends.s3boto3 import S3Boto3Storage

from divego_project.constants import *

DIVER = "diver"
INSTRUCTOR = "instructor"
STORE = "store"
STAFF = "staff"
ROLES = (
    (DIVER, "Diver"),
    (INSTRUCTOR, "Instructor"),
    (STORE, "Store"),
    (STAFF, "Staff"),
)

FREEDIVER = "freediver"
SCUBA_DIVER = "scuba_diver"
DIVER_TYPE = (
    (FREEDIVER, "Freediver"),
    (SCUBA_DIVER, "Scuba Diver")
)

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


class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.TextField(max_length=90, blank=False, unique=True)
    first_name = models.TextField(max_length=50, blank=True)
    last_name = models.TextField(max_length=50, blank=True)
    username = models.TextField(max_length=50, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateTimeField(null=True, blank=True)
    active_role = models.TextField(choices=ROLES, blank=True)
    diver_type = models.TextField(choices=DIVER_TYPE, blank=True)
    phone = models.TextField(max_length=50, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(null=True)
    privileges = ArrayField(
        models.TextField(blank=True, choices=PRIVILEGES),
        default=list,
        blank=True,
    )
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

    @property
    def readable_date_joined(self):
        local_tz = pytz.timezone("Asia/Manila")
        local_dt = self.date_joined.replace(tzinfo=pytz.utc).astimezone(local_tz)

        return {
            "date": local_dt.strftime("%d %b %Y"),
            "time": local_dt.strftime("%I:%M %p"),
        }

    @property
    def readable_last_login(self):
        local_tz = pytz.timezone("Asia/Manila")
        local_dt = self.last_login.replace(tzinfo=pytz.utc).astimezone(local_tz)

        return {
            "date": local_dt.strftime("%d %b %Y"),
            "time": local_dt.strftime("%I:%M %p"),
        }
    
    
class ResetPasswordSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, blank=False, null=True)
    token = models.TextField(max_length=70, blank=False)
    verified_token = models.TextField(max_length=70, blank=False, null=True)
    created_date = models.DateTimeField(null=False, blank=False, default=timezone.now)
