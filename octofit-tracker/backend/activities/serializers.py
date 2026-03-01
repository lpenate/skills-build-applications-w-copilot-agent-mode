from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Activity

User = get_user_model()


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='user')

    class Meta:
        model = Activity
        fields = [
            'id', 'user_id', 'activity_type', 'duration_minutes', 'calories_burned', 'performed_at', 'created_at'
        ]
        read_only_fields = ['created_at']

    def get_id(self, obj):
        return str(obj.pk)
