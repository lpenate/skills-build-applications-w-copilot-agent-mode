from django.contrib import admin
from .models import UserProfile

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
	list_display = ('user', 'age', 'height_cm', 'weight_kg', 'fitness_goal', 'created_at', 'updated_at')
