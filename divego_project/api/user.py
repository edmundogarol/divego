from secrets import token_urlsafe

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FormParser

from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError
from django.contrib.auth import password_validation
from django.shortcuts import get_object_or_404

from divego_project.api.permissions import UserPermissions
from divego_project.utils import visitor_ip_address
from divego_project.models import User
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

        ip_data = visitor_ip_address(validated_data)

        if not validated_data.data["password"] or not validated_data.data["email"]:
            content = {"error": "Please provide both email and password."}
            return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)

        try:
            password_validation.validate_password(validated_data.data["password"])
        except ValidationError as error:
            content = {"error": error}
            return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)

        try:
            user = User.objects.create_user(
                email=validated_data.data["email"].lower(),
                password=validated_data.data["password"],
            )
        except IntegrityError:
            content = {"error": "Duplicate email. User already exists."}
            return Response(content, status=status.HTTP_409_CONFLICT)

        user.last_ip = ip_data["ip"] if ip_data["valid"] else None
        user.verified = token_urlsafe(20)
        user.set_password(validated_data.data["password"])
        user.save()

        # Thread(
        #     target=send_account_verification_email,
        #     args=(
        #         user,
        #         user.verified,
        #     ),
        # ).start()

        content = {
            "user": str(user),
            "logged_in": True,  # None
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
        cover = request.data.get("cover", None)
        image_avatar = request.data.get("avatar", None)

        user_id = request.data.get("user_id", None)

        if str(cover) == "remove":
            user = User.objects.get(id=user_id)
            user.cover.delete()

            return Response({"success": "Removed user cover."})

        if str(image_avatar) == "remove":
            user = User.objects.get(id=user_id)
            user.image.delete()

            serializer = UserSerializer(user)
            return Response({"success": "Removed user avatar."})

        if request.data.get("image", None):
            parser_classes = (MultiPartParser, FormParser)

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
                content = {"Error": "User with this username already exists."}
                return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)
            except User.DoesNotExist:
                pass

        queryset = User.objects.all()
        user = queryset.get(pk=user_id if user_id else kwargs.get("pk"))

        # if request.data.get("image", None) and user.image:
        #     if S3_STORAGE:
        #         user.image.delete()
        #     else:
        #         os.remove(os.path.join(MEDIA_ROOT, user.image.name))

        # if cover and user.cover:
        #     if S3_STORAGE:
        #         user.cover.delete()
        #     else:
        #         os.remove(os.path.join(MEDIA_ROOT, user.cover.name))

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