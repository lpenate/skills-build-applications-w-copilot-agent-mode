from django.contrib import admin
from .models import WorkoutSuggestion

@admin.register(WorkoutSuggestion)
class WorkoutSuggestionAdmin(admin.ModelAdmin):
	list_display = ('user', 'title', 'difficulty', 'estimated_minutes', 'created_at')
