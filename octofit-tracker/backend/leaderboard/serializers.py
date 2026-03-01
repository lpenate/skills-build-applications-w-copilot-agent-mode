from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import LeaderboardEntry

User = get_user_model()


class LeaderboardEntrySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='user')

    class Meta:
        model = LeaderboardEntry
        fields = ['id', 'user_id', 'points', 'weekly_points', 'updated_at']
        read_only_fields = ['updated_at']

    def get_id(self, obj):
        return str(obj.pk)
