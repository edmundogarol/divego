import datetime
from secrets import token_urlsafe

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FormParser

from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError
from django.contrib.auth import password_validation, login
from django.shortcuts import get_object_or_404

from divego_project.api.permissions import UserPermissions
from divego_project.utils import visitor_ip_address
from divego_project.models import User, FREEDIVER
from divego_project.serializers import UserSerializer
from divego_project.settings import LOCAL_DEV


class UserViewSet(ModelViewSet):
    queryset = User.objects.all().order_by("-id")
    serializer_class = UserSerializer
    permission_classes = (UserPermissions,)

    def list(self, request, *args, **kwargs):
        queryset = User.objects.all().order_by("-id")
        search = request.GET.get("search", None)

        # settings = Settings.objects.first()
        # if settings.user_list_order == BY_LAST_LOGIN:
        #     queryset = User.objects.all().order_by(
        #         F("last_login").desc(nulls_last=True)
        #     )

        if search:
            queryset = queryset.filter(email__icontains=search)

        page = self.paginate_queryset(queryset)
        serializer = UserSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def create(self, validated_data):
        user = None
        data = validated_data.data
        ip_data = visitor_ip_address(validated_data)

        if not data["password"]:
            content = {"password": "Please provide password."}
            return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        if not data["email"]:
            content = {"email": "Please provide email address"}
            return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        if data["email"]:
            try:
                validate_email(data["email"])
            except ValidationError as e:
                content = {"error": e}
                return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        if not data["first_name"] or not data["last_name"]:
            content = {"first_name": "Please provide a first and last name."}
            return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)

        try:
            password_validation.validate_password(data["password"])
        except ValidationError as error:
            content = {"error": error}
            return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)

        try:
            user = User.objects.create_user(
                email=data["email"].lower(),
                password=data["password"],
            )
        except IntegrityError:
            content = {"error": "Duplicate email. User already exists."}
            return Response(content, status=status.HTTP_409_CONFLICT)

        user.last_ip = ip_data["ip"] if ip_data["valid"] else None
        user.first_name = data["first_name"]
        user.last_name = data["last_name"]
        user.verified = token_urlsafe(20)
        user.last_login = datetime.datetime.now()
        user.set_password(data["password"])
        user.save()

        login(validated_data, user)

        # Thread(
        #     target=send_account_verification_email,
        #     args=(
        #         user,
        #         user.verified,
        #     ),
        # ).start()

        serializer = UserSerializer(user)
        content = {
            "user": serializer.data,           
            "logged_in": True,
        }

        return Response(content)

    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        password = request.data.get("password", None)
        email = request.data.get("email", None)
        username = request.data.get("username", None)
        user_id = request.data.get("user_id", None)
        active_role = request.data.get("active_role", None)
        diver_type = request.data.get("diver_type", None)

        if active_role is not None:
            user = User.objects.get(id=user_id)
            user.active_role = active_role
            user.diver_type = diver_type
            user.save()
            
            serializer = UserSerializer(user)
            return Response(serializer.data)
            
        if password is not None:
            try:
                password_validation.validate_password(request.data["password"])
            except ValidationError as error:
                content = {"error": error}
                return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)

        if email is not None:
            try:
                validate_email(email)
            except ValidationError as e:
                content = {"error": e}
                return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)

        if username is not None and username != "":
            try:
                user = User.objects.get(username=username)
                content = {"Error": "This username is unavailable."}
                return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)
            except User.DoesNotExist:
                pass

        queryset = User.objects.all()
        user = queryset.get(pk=user_id if user_id else kwargs.get("pk"))

        if LOCAL_DEV:
            request.data["image_public"] = None

        serializer = UserSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if email is not None:
            user = User.objects.get(id=user.id)
            user.verified = None
            user.save()

            serializer = UserSerializer(user)
            return Response(serializer.data)

        return Response(serializer.data)