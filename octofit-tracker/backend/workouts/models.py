from django.conf import settings
from django.db import models


class WorkoutSuggestion(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='workout_suggestions')
	title = models.CharField(max_length=150)
	description = models.TextField()
	difficulty = models.CharField(max_length=50, default='beginner')
	estimated_minutes = models.PositiveIntegerField(default=30)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ['-created_at']

	def __str__(self):
		return f"{self.title} ({self.user.username})"
