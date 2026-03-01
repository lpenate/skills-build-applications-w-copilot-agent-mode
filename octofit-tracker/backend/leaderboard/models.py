from django.conf import settings
from django.db import models


class LeaderboardEntry(models.Model):
	user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='leaderboard_entry')
	points = models.PositiveIntegerField(default=0)
	weekly_points = models.PositiveIntegerField(default=0)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ['-points', '-weekly_points']

	def __str__(self):
		return f"{self.user.username}: {self.points}"
