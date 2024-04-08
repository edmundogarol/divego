from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny

from django.contrib.auth import login, logout
from django.contrib.auth.hashers import check_password

from divego_project.utils import visitor_ip_address
from divego_project.models import User
from divego_project.serializers import UserSerializer


class LogoutView(APIView):
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        logout(request)
        content = {
            "logged_in": False,
            "is_staff": False,
        }
        return Response(content)


class LoginView(APIView):
    authentication_classes = (SessionAuthentication,)
    permission_classes = [AllowAny]

    def get(self, request):
        ip_data = visitor_ip_address(request)

        if str(self.request.user) != "AnonymousUser":
            user = User.objects.get(email=self.request.user)
            user.last_ip = ip_data["ip"] if ip_data["valid"] else None
            user.save()

            serializer = UserSerializer(user)
            content = {
                "user": serializer.data,
                "logged_in": True,
            }
            return Response(content)
        else:
            content = {
                "logged_in": False,
                "is_staff": False,
            }
            return Response(content)

    def post(self, request):

        email = request.data.get("email", None)
        password = request.data.get("password", None)
        ip_data = visitor_ip_address(request)

        if not email or not password:
            raise AuthenticationFailed("No credentials provided.")

        try:
            user = User.objects.get(email=email.lower())
        except User.DoesNotExist:
            raise AuthenticationFailed("Invalid username/password.")

        if user is None or not check_password(password, user.password):
            raise AuthenticationFailed("Invalid username/password.")
        else:
            login(request, user)

        if not user.is_active:
            raise AuthenticationFailed("User inactive or deleted.")

        user = User.objects.get(email=self.request.user)
        user.last_ip = ip_data["ip"] if ip_data["valid"] else None
        user.save()

        serializer = UserSerializer(user)
        content = {
            "user": serializer.data,
            "logged_in": True,
        }
        return Response(content)
