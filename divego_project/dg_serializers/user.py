from rest_framework import serializers

from divego_project.models import (
    ResetPasswordSession,
    User,
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "bio",
            "privileges",
            "verified",
            "locations",
            "privileges",
            "current_location",
            "birth_date",
            "active_role",
            "password",
            "is_staff",
            "last_login",
            "readable_last_login",
            "readable_date_joined",
            "last_ip",
            "image",
            "image_public",
        )
        extra_kwargs = {"password": {"write_only": True}}

        
class ResetPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResetPasswordSession
        fields = ("id", "user", "token", "created_date")
