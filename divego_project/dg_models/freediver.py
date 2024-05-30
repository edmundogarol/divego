
from django.db import models
from django.contrib.postgres.fields import ArrayField

from storages.backends.s3boto3 import S3Boto3Storage

from divego_project.constants import *
from divego_project.dg_models.user import User

MOLCHANOVS_WD = "molchanovs_waveD"
MOLCHANOVS_W1 = "molchanovs_wave1"
MOLCHANOVS_W2 = "molchanovs_wave2"
MOLCHANOVS_W3 = "molchanovs_wave3"
MOLCHANOVS_W4 = "molchanovs_wave4"
MOLCHANOVS_W2I = "molchanovs_wave2i"
MOLCHANOVS_W3I = "molchanovs_wave3i"
MOLCHANOVS_W4I = "molchanovs_wave4i"
MOLCHANOVS_IT = "molchanovs_it"
MOLCHANOVS_W3IT = "molchanovs_w3it"
MOLCHANOVS_W4IT = "molchanovs_w4it"
MOLCHANOVS_ITD = "molchanovs_itd"
MOLCHANOVS_CERTIFICATIONS = (
    (MOLCHANOVS_WD, "Molchanovs Discover Wave"),
    (MOLCHANOVS_W1, "Molchanovs Wave 1"),
    (MOLCHANOVS_W2, "Molchanovs Wave 2"),
    (MOLCHANOVS_W3, "Molchanovs Wave 3"),
    (MOLCHANOVS_W4, "Molchanovs Wave 4"),
    (MOLCHANOVS_W2I, "Molchanovs Wave 2 Instructor"),
    (MOLCHANOVS_W3I, "Molchanovs Wave 3 Instructor"),
    (MOLCHANOVS_W4I, "Molchanovs Wave 4 Instructor"),
    (MOLCHANOVS_IT, "Molchanovs Instructor Trainer"),
    (MOLCHANOVS_W3IT, "Molchanovs Wave 3 Instructor Trainer"),
    (MOLCHANOVS_W4IT, "Molchanovs Wave 4 Instructor Trainer"),
    (MOLCHANOVS_ITD, "Molchanovs Instructor Trainer Developer"),
)

AIDA_1 = "aida1"
AIDA_2 = "aida2"
AIDA_3 = "aida3"
AIDA_4 = "aida4"
AIDA_I = "aida_instructor"
AIDA_MI = "aida_master_instructor"
AIDA_IT = "aida_instructor_trainer"
AIDA_CERTIFICATIONS = (
    (AIDA_1, "AIDA 1"),
    (AIDA_2, "AIDA 2"),
    (AIDA_3, "AIDA 3"),
    (AIDA_4, "AIDA 4"),
    (AIDA_I, "AIDA Instructor"),
    (AIDA_MI, "AIDA Master Instructor"),
    (AIDA_IT, "AIDA Instructor Trainer"),
)

PADI_B = "padi_basic"
PADI_F = "padi_freediver"
PADI_AF = "padi_advanced_freediver"
PADI_MF = "padi_master_freediver"
PADI_FI = "padi_freediver_instructor"
PADI_AFI = "padi_advanced_freediver_instructor"
PADI_MFI = "padi_master_freediver_instructor"
PADI_IT = "padi_freediver_instructor_trainer"
PADI_CERTIFICATIONS = (
    (PADI_B, "PADI Basic Freediver"),
    (PADI_F, "PADI Freediver"),
    (PADI_AF, "PADI Advanced Freediver"),
    (PADI_MF, "PADI Master Freediver"),
    (PADI_FI, "PADI Freediver Instructor"),
    (PADI_AFI, "PADI Advanced Freediver Instructor"),
    (PADI_MFI, "PADI Master Freediver Instructor"),
    (PADI_IT, "PADI Freediver Instructor Trainer"),
)

NON_CERT = "non_cert"
OTHER_CERT = "other_cert"
OTHER_CERTIFICATIONS = (
    (NON_CERT, "Non-certified"),
    (OTHER_CERT, "Other Certification"),
)

CERTIFICATIONS = OTHER_CERTIFICATIONS + MOLCHANOVS_CERTIFICATIONS + AIDA_CERTIFICATIONS + PADI_CERTIFICATIONS

FUN_DIVER = "fun_diver"
LINE_DIVER = "line_diver"
SPEAR_FISHER = "spear_fisher"
FREEDIVER_TYPE = (
    (FUN_DIVER, "Fun Diver"),
    (LINE_DIVER, "Line Diver"),
    (SPEAR_FISHER, "Spear Fisher")
)

class Freediver(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    location = models.CharField(max_length=30, blank=True)
    preferred_dive_locations = ArrayField(
        models.TextField(blank=True),
        default=list,
        blank=True,
    )
    freediver_type = models.TextField(choices=FREEDIVER_TYPE, blank=True)
    certification = models.TextField(choices=CERTIFICATIONS, blank=True)
    certification_number = models.TextField(max_length=50, blank=False, null=True)
    certification_verified = models.BooleanField(default=False)
    image = models.ImageField(upload_to="diver_profile", null=True)
    image_public = models.ImageField(
        storage=S3Boto3Storage(bucket_name="divego-resources"),
        upload_to="diver_profile_public",
        null=True,
    )
  