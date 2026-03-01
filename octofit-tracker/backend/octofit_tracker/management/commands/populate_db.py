"""
Populate the octofit_db database with test data.

This Django management command creates test users, profiles, teams,
activities, leaderboard entries, and workout suggestions.
"""
import uuid

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone

from users.models import UserProfile
from teams.models import Team
from activities.models import Activity
from leaderboard.models import LeaderboardEntry
from workouts.models import WorkoutSuggestion

User = get_user_model()


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Clearing existing data...')
        WorkoutSuggestion.objects.all().delete()
        LeaderboardEntry.objects.all().delete()
        Activity.objects.all().delete()
        Team.objects.all().delete()
        UserProfile.objects.all().delete()
        User.objects.all().delete()

        self.stdout.write('Creating users...')
        user1 = User.objects.create_user(
            id=str(uuid.uuid4())[:24],
            username='alice',
            email='alice@example.com',
            password='test123'
        )
        user2 = User.objects.create_user(
            id=str(uuid.uuid4())[:24],
            username='bob',
            email='bob@example.com',
            password='test123'
        )
        user3 = User.objects.create_user(
            id=str(uuid.uuid4())[:24],
            username='carol',
            email='carol@example.com',
            password='test123'
        )

        self.stdout.write('Creating profiles...')
        UserProfile.objects.create(user=user1, age=28, height_cm=165, weight_kg=60, fitness_goal='Lose weight')
        UserProfile.objects.create(user=user2, age=32, height_cm=175, weight_kg=80, fitness_goal='Build muscle')
        UserProfile.objects.create(user=user3, age=24, height_cm=160, weight_kg=55, fitness_goal='Stay healthy')

        self.stdout.write('Creating teams...')
        team1 = Team.objects.create(name='OctoFit Warriors', description='Competitive team')
        team2 = Team.objects.create(name='Fit Friends', description='Friends group')
        team1.members.set([user1, user2])
        team2.members.set([user2, user3])

        self.stdout.write('Creating activities...')
        Activity.objects.create(user=user1, activity_type='Running', duration_minutes=30, calories_burned=300, performed_at=timezone.now())
        Activity.objects.create(user=user2, activity_type='Cycling', duration_minutes=45, calories_burned=400, performed_at=timezone.now())
        Activity.objects.create(user=user3, activity_type='Yoga', duration_minutes=60, calories_burned=200, performed_at=timezone.now())

        self.stdout.write('Creating leaderboard entries...')
        LeaderboardEntry.objects.create(user=user1, points=1200, weekly_points=300)
        LeaderboardEntry.objects.create(user=user2, points=1500, weekly_points=400)
        LeaderboardEntry.objects.create(user=user3, points=900, weekly_points=200)

        self.stdout.write('Creating workout suggestions...')
        WorkoutSuggestion.objects.create(user=user1, title='Cardio Blast', description='Intense cardio workout', difficulty='intermediate', estimated_minutes=40)
        WorkoutSuggestion.objects.create(user=user2, title='Strength Builder', description='Strength gain routine', difficulty='advanced', estimated_minutes=50)
        WorkoutSuggestion.objects.create(user=user3, title='Morning Yoga', description='Yoga to start the day', difficulty='beginner', estimated_minutes=30)

        self.stdout.write(self.style.SUCCESS('Successfully populated the octofit_db database with test data.'))
