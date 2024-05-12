
from django.db import models

from storages.backends.s3boto3 import S3Boto3Storage

from divego_project.constants import *
from divego_project.dg_models.user import User

FREEDIVING_SHOP = "freediving_shop"
SCUBA_SHOP = "scuba_shop"
ALL_DIVE_SHOP = "all_dive_shop"
SHOP_TYPE = (
    (FREEDIVING_SHOP, "Freediving Shop"),
    (SCUBA_SHOP, "Scuba Shop"),
    (ALL_DIVE_SHOP, "All Dive Shop")
)

class DiveShop(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    location = models.CharField(max_length=30, blank=True)
    shop_type = models.TextField(choices=SHOP_TYPE, blank=True)
    email = models.TextField(max_length=90, blank=False, unique=True)
    phone = models.TextField(max_length=50, blank=True)
    image = models.ImageField(upload_to="diver_profile", null=True)
    image_public = models.ImageField(
        storage=S3Boto3Storage(bucket_name="divego-resources"),
        upload_to="diver_profile_public",
        null=True,
    )
  