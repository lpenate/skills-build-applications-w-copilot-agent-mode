from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Team

User = get_user_model()


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    member_ids = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='members', many=True, required=False)

    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'member_ids', 'created_at']
        read_only_fields = ['created_at']

    def get_id(self, obj):
        return str(obj.pk)
