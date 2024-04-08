from rest_framework import serializers

from divego_project.models import (
    User,
    Privileges,
)


class PrivilegeSerializer(serializers.ModelSerializer):
    def to_representation(self, value):
        return value.name

    class Meta:
        model = Privileges
        fields = ["id", "name"]


class UserSerializer(serializers.ModelSerializer):
    privileges = PrivilegeSerializer(many=True)

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
            "location",
            "birth_date",
            "roles",
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