from django.test import TestCase
from .models import WorkoutSuggestion
from users.models import OctoUser

class WorkoutSuggestionModelTest(TestCase):
	def test_create_workout_suggestion(self):
		user = OctoUser.objects.create(id='testidworkout', username='workoutuser')
		suggestion = WorkoutSuggestion.objects.create(user=user, title='Cardio', description='Cardio intenso')
		self.assertEqual(suggestion.title, 'Cardio')
