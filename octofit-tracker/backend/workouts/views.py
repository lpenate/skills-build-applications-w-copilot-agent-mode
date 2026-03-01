from rest_framework import viewsets

from .models import WorkoutSuggestion
from .serializers import WorkoutSuggestionSerializer


class WorkoutSuggestionViewSet(viewsets.ModelViewSet):
	queryset = WorkoutSuggestion.objects.select_related('user').all()
	serializer_class = WorkoutSuggestionSerializer
