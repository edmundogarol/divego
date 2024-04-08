from rest_framework.permissions import BasePermission

from divego_project.models import User


def staff(request):
    return request.user.is_authenticated and request.user.is_staff

class AdminOnly(BasePermission):
    def has_permission(self, request):
        return request.user.is_authenticated and request.user.is_staff



# Only allow logged in users to create and edit their own interactions (create, retrieve, partial, destroy)
class UserPermissions(BasePermission):
    def has_permission(self, request, view):
        if staff(request):
            return True
        elif view.action in ["create"]:
            return True
        elif view.action in ["retrieve", "partial_update"]:
            user_id = view.kwargs.get("pk")

            if request.user.is_authenticated:
                try:
                    user = User.objects.get(id=user_id)
                    return user.email.strip() == str(request.user).strip()
                except User.DoesNotExist:
                    return False
        else:
            return False