import os
import pytz
import socket

from rest_framework.permissions import BasePermission

if "DEVENV" in os.environ:
    log = True
else:
    log = False


def devprint(message):
    if log:
        print(message)


def get_readable_date_time(date):
    local_tz = pytz.timezone("Australia/Sydney")
    local_dt = date.replace(tzinfo=pytz.utc).astimezone(local_tz)

    return {
        "date": local_dt.strftime("%d/%m/%y"),
        "time": local_dt.strftime("%I:%M %p"),
    }


def visitor_ip_address(request):

    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")

    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")

    try:
        socket.inet_aton(ip)
        ip_valid = True
    except socket.error:
        ip_valid = False

    return {"ip": ip, "valid": ip_valid}


class AdminOnly(BasePermission):
    def has_permission(self, request):
        return request.user.is_authenticated and request.user.is_staff
