from rest_framework import viewsets

from .models import Team
from .serializers import TeamSerializer


class TeamViewSet(viewsets.ModelViewSet):
	queryset = Team.objects.prefetch_related('members').all().order_by('name')
	serializer_class = TeamSerializer
