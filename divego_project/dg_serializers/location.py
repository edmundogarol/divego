from rest_framework import serializers

from divego_project.dg_models.user import Location

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"