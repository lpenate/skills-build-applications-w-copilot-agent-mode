from rest_framework import viewsets

from .models import Activity
from .serializers import ActivitySerializer


class ActivityViewSet(viewsets.ModelViewSet):
	queryset = Activity.objects.select_related('user').all().order_by('-performed_at')
	serializer_class = ActivitySerializer
