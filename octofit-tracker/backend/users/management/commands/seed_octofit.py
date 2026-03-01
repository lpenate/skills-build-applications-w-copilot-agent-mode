from datetime import timedelta

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.utils import timezone

from activities.models import Activity
from leaderboard.models import LeaderboardEntry
from teams.models import Team
from users.models import UserProfile
from workouts.models import WorkoutSuggestion


class Command(BaseCommand):
    help = 'Seed OctoFit data using Django ORM.'

    def handle(self, *args, **options):
        User = get_user_model()

        users_data = [
            {
                'username': 'alex',
                'email': 'alex@octofit.dev',
                'first_name': 'Alex',
                'last_name': 'Rivera',
                'password': 'OctoFit123!',
                'profile': {'age': 29, 'height_cm': 178, 'weight_kg': 76, 'fitness_goal': 'Build endurance'},
                'leaderboard': {'points': 320, 'weekly_points': 85},
                'activities': [
                    {'activity_type': 'Running', 'duration_minutes': 45, 'calories_burned': 420},
                    {'activity_type': 'Cycling', 'duration_minutes': 30, 'calories_burned': 300},
                ],
                'workouts': [
                    {
                        'title': 'Tempo Run',
                        'description': '10 min warmup + 20 min tempo + 10 min cooldown.',
                        'difficulty': 'intermediate',
                        'estimated_minutes': 40,
                    }
                ],
            },
            {
                'username': 'sam',
                'email': 'sam@octofit.dev',
                'first_name': 'Sam',
                'last_name': 'Patel',
                'password': 'OctoFit123!',
                'profile': {'age': 34, 'height_cm': 171, 'weight_kg': 70, 'fitness_goal': 'Lose body fat'},
                'leaderboard': {'points': 280, 'weekly_points': 70},
                'activities': [
                    {'activity_type': 'Strength Training', 'duration_minutes': 50, 'calories_burned': 360},
                    {'activity_type': 'Rowing', 'duration_minutes': 25, 'calories_burned': 220},
                ],
                'workouts': [
                    {
                        'title': 'Upper Body Split',
                        'description': 'Push/pull supersets with progressive overload.',
                        'difficulty': 'intermediate',
                        'estimated_minutes': 55,
                    }
                ],
            },
            {
                'username': 'maria',
                'email': 'maria@octofit.dev',
                'first_name': 'Maria',
                'last_name': 'Lopez',
                'password': 'OctoFit123!',
                'profile': {'age': 26, 'height_cm': 165, 'weight_kg': 61, 'fitness_goal': 'Improve consistency'},
                'leaderboard': {'points': 240, 'weekly_points': 62},
                'activities': [
                    {'activity_type': 'Yoga', 'duration_minutes': 40, 'calories_burned': 180},
                    {'activity_type': 'HIIT', 'duration_minutes': 20, 'calories_burned': 250},
                ],
                'workouts': [
                    {
                        'title': 'HIIT Starter',
                        'description': '8 rounds of 30s work and 30s rest.',
                        'difficulty': 'beginner',
                        'estimated_minutes': 25,
                    }
                ],
            },
        ]

        users = []
        now = timezone.now()
        for index, item in enumerate(users_data):
            user, created = User.objects.get_or_create(
                username=item['username'],
                defaults={
                    'email': item['email'],
                    'first_name': item['first_name'],
                    'last_name': item['last_name'],
                },
            )

            if created:
                user.set_password(item['password'])
                user.save(update_fields=['password'])

            UserProfile.objects.update_or_create(user=user, defaults=item['profile'])
            LeaderboardEntry.objects.update_or_create(user=user, defaults=item['leaderboard'])

            for offset, activity in enumerate(item['activities']):
                Activity.objects.get_or_create(
                    user=user,
                    activity_type=activity['activity_type'],
                    duration_minutes=activity['duration_minutes'],
                    performed_at=now - timedelta(days=index, minutes=offset * 15),
                    defaults={'calories_burned': activity['calories_burned']},
                )

            for workout in item['workouts']:
                WorkoutSuggestion.objects.get_or_create(
                    user=user,
                    title=workout['title'],
                    defaults={
                        'description': workout['description'],
                        'difficulty': workout['difficulty'],
                        'estimated_minutes': workout['estimated_minutes'],
                    },
                )

            users.append(user)

        team_alpha, _ = Team.objects.get_or_create(
            name='Team Kraken', defaults={'description': 'Competitive endurance team'}
        )
        team_alpha.members.set([users[0], users[1]])

        team_beta, _ = Team.objects.get_or_create(
            name='Team Coral', defaults={'description': 'Consistency and healthy habits'}
        )
        team_beta.members.set([users[1], users[2]])

        self.stdout.write(self.style.SUCCESS('OctoFit seed completed successfully.'))