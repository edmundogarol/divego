
from django.db import models
from django.contrib.postgres.fields import ArrayField

from storages.backends.s3boto3 import S3Boto3Storage

from divego_project.constants import *
from divego_project.dg_models.freediver import (
  AIDA_I, AIDA_IT, AIDA_MI, MOLCHANOVS_IT, MOLCHANOVS_ITD, 
  MOLCHANOVS_W2I, MOLCHANOVS_W3I, MOLCHANOVS_W3IT, MOLCHANOVS_W4I, 
  MOLCHANOVS_W4IT, PADI_AFI, PADI_FI, PADI_IT, PADI_MFI
)
from divego_project.dg_models.user import User

MOLCHANOVS_INSTRUCTOR_CERTIFICATIONS = (
    (MOLCHANOVS_W2I, "Molchanovs Wave 2 Instructor"),
    (MOLCHANOVS_W3I, "Molchanovs Wave 3 Instructor"),
    (MOLCHANOVS_W4I, "Molchanovs Wave 4 Instructor"),
    (MOLCHANOVS_IT, "Molchanovs Instructor Trainer"),
    (MOLCHANOVS_W3IT, "Molchanovs Wave 3 Instructor Trainer"),
    (MOLCHANOVS_W4IT, "Molchanovs Wave 4 Instructor Trainer"),
    (MOLCHANOVS_ITD, "Molchanovs Instructor Trainer Developer"),
)

AIDA_INSTRUCTOR_CERTIFICATIONS = (
    (AIDA_I, "AIDA Instructor"),
    (AIDA_MI, "AIDA Master Instructor"),
    (AIDA_IT, "AIDA Instructor Trainer"),
)

PADI_INSTRUCTOR_CERTIFICATIONS = (
    (PADI_FI, "PADI Freediver Instructor"),
    (PADI_AFI, "PADI Advanced Freediver Instructor"),
    (PADI_MFI, "PADI Master Freediver Instructor"),
    (PADI_IT, "PADI Freediver Instructor Trainer"),
)

INSTRUCTOR_CERTIFICATIONS = MOLCHANOVS_INSTRUCTOR_CERTIFICATIONS + AIDA_INSTRUCTOR_CERTIFICATIONS + PADI_INSTRUCTOR_CERTIFICATIONS

class FreediveInstructor(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    location = models.CharField(max_length=30, blank=True)
    preferred_dive_locations = ArrayField(
        models.TextField(blank=True),
        default=list,
        blank=True,
    )
    email = models.TextField(max_length=90, blank=False, unique=True)
    phone = models.TextField(max_length=50, blank=True)
    certification = models.TextField(choices=INSTRUCTOR_CERTIFICATIONS, blank=True)
    certification_verified = models.TextField(max_length=50, blank=False, null=True)
    image = models.ImageField(upload_to="diver_profile", null=True)
    image_public = models.ImageField(
        storage=S3Boto3Storage(bucket_name="divego-resources"),
        upload_to="diver_profile_public",
        null=True,
    )
  