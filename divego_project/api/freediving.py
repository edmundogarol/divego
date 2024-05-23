
from rest_framework import status
from rest_framework.response import Response
from rest_framework.mixins import UpdateModelMixin
from rest_framework.viewsets import ViewSet

from django.shortcuts import get_object_or_404

from divego_project.dg_models.freedive_instructor import FreediveInstructor
from divego_project.dg_models.freediver import Freediver
from divego_project.dg_serializers.freediving import FreediverSerializer, FreediveInstructorSerializer


class FreediverView(UpdateModelMixin, ViewSet):

    def retrieve(self, request, pk=None):
        queryset = Freediver.objects.all()

        if pk == "null" or pk == "NaN":
            return Response(status=status.HTTP_404_NOT_FOUND)

        freediver = get_object_or_404(queryset, pk=pk)
        serializer = FreediverSerializer(freediver)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        queryset = Freediver.objects.all()
        freediver = queryset.get(pk=kwargs.get("pk"))
        serializer = FreediverSerializer(freediver, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    

class FreediveInstructorView(UpdateModelMixin, ViewSet):

    def retrieve(self, request, pk=None):
        queryset = FreediveInstructor.objects.all()

        if pk == "null" or pk == "NaN":
            return Response(status=status.HTTP_404_NOT_FOUND)

        freedive_instructor = get_object_or_404(queryset, pk=pk)
        serializer = FreediveInstructorSerializer(freedive_instructor)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        queryset = FreediveInstructor.objects.all()
        freedive_instructor = queryset.get(pk=kwargs.get("pk"))
        serializer = FreediveInstructorSerializer(freedive_instructor, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)