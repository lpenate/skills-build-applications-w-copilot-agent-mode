from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import WorkoutSuggestion

User = get_user_model()


class WorkoutSuggestionSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='user')

    class Meta:
        model = WorkoutSuggestion
        fields = ['id', 'user_id', 'title', 'description', 'difficulty', 'estimated_minutes', 'created_at']
        read_only_fields = ['created_at']

    def get_id(self, obj):
        return str(obj.pk)
