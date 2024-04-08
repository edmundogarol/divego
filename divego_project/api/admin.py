from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.schemas import SchemaGenerator
from rest_framework_swagger import renderers
from rest_framework.permissions import AllowAny

from divego_project.utils import AdminOnly


class SwaggerSchemaView(APIView):
    # permission_classes = [AdminOnly]
    permission_classes = [
        AllowAny
    ]  # User for testing to see what endpoints are available to regular users
    renderer_classes = [renderers.OpenAPIRenderer, renderers.SwaggerUIRenderer]

    def get(self, request):
        generator = SchemaGenerator()
        schema = generator.get_schema(request=request)

        return Response(schema)
