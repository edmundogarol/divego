from django.urls import include, path
from django.conf.urls import url

from rest_framework import routers
from rest_framework import permissions

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from divego_project.api.user import UserViewSet
from divego_project.api.login import LoginView, LogoutView
from divego_project.api.reset_password import ResetPasswordViewSet


schema_view = get_schema_view(
   openapi.Info(
      title="DiveGo API Docs",
      default_version='v1',
      description="DiveGo API Docs",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

router = routers.DefaultRouter()
router.register(r"user", UserViewSet, basename="user")
router.register(r"reset-password", ResetPasswordViewSet, basename="reset-password")

urlpatterns = [
    # Docs
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    # Login
    url(r"api/login/", LoginView.as_view()),
    url(r"api/logout/", LogoutView.as_view()),

    # API
    path("api/", include(router.urls)),
]
