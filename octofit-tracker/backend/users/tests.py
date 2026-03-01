from django.test import TestCase
from .models import OctoUser, UserProfile

class UserModelTest(TestCase):
	def test_create_user_and_profile(self):
		user = OctoUser.objects.create(id='testid123456789012345678', username='testuser', email='test@example.com')
		profile = UserProfile.objects.create(user=user, age=30)
		self.assertEqual(profile.user.username, 'testuser')
