from django.conf import settings
from django.db import models


class Activity(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='activities')
	activity_type = models.CharField(max_length=100)
	duration_minutes = models.PositiveIntegerField()
	calories_burned = models.PositiveIntegerField(default=0)
	performed_at = models.DateTimeField()
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"{self.activity_type} by {self.user.username}"
