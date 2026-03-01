from django.test import TestCase
from .models import LeaderboardEntry
from users.models import OctoUser

class LeaderboardModelTest(TestCase):
	def test_create_leaderboard_entry(self):
		user = OctoUser.objects.create(id='testidleaderboard', username='leaderuser')
		entry = LeaderboardEntry.objects.create(user=user, points=100)
		self.assertEqual(entry.points, 100)
