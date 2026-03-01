from django.test import TestCase
from .models import Activity
from users.models import OctoUser
from django.utils import timezone

class ActivityModelTest(TestCase):
	def test_create_activity(self):
		user = OctoUser.objects.create(id='testidactivity', username='activityuser')
		activity = Activity.objects.create(user=user, activity_type='Running', duration_minutes=20, performed_at=timezone.now())
		self.assertEqual(activity.activity_type, 'Running')
