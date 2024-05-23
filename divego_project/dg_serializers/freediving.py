from rest_framework import serializers

from divego_project.models import Freediver, FreediveInstructor


class FreediverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Freediver
        fields = "__all__"

class FreediveInstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = FreediveInstructor
        fields = "__all__"