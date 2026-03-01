from django.contrib import admin
from .models import Activity

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
	list_display = ('user', 'activity_type', 'duration_minutes', 'calories_burned', 'performed_at', 'created_at')
