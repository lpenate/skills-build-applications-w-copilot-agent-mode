import django
import os
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'octofit_tracker.settings')
django.setup()

from django.contrib.auth import get_user_model
from users.models import UserProfile
from teams.models import Team
from activities.models import Activity
from leaderboard.models import LeaderboardEntry
from workouts.models import WorkoutSuggestion
from django.utils import timezone

User = get_user_model()

import uuid
def create_test_data():
    # Limpiar colecciones
    User.objects.all().delete()
    UserProfile.objects.all().delete()
    Team.objects.all().delete()
    Activity.objects.all().delete()
    LeaderboardEntry.objects.all().delete()
    WorkoutSuggestion.objects.all().delete()
    # Crear usuarios con id único
    user1 = User.objects.create_user(id=str(uuid.uuid4())[:24], username='alice', email='alice@example.com', password='test123')
    user2 = User.objects.create_user(id=str(uuid.uuid4())[:24], username='bob', email='bob@example.com', password='test123')
    user3 = User.objects.create_user(id=str(uuid.uuid4())[:24], username='carol', email='carol@example.com', password='test123')

    # Crear perfiles
    UserProfile.objects.create(user=user1, age=28, height_cm=165, weight_kg=60, fitness_goal='Perder peso')
    UserProfile.objects.create(user=user2, age=32, height_cm=175, weight_kg=80, fitness_goal='Ganar músculo')
    UserProfile.objects.create(user=user3, age=24, height_cm=160, weight_kg=55, fitness_goal='Mantenerse saludable')

    # Crear equipos
    team1 = Team.objects.create(name='OctoFit Warriors', description='Equipo competitivo')
    team2 = Team.objects.create(name='Fit Friends', description='Grupo de amigos')
    team1.members.set([user1, user2])
    team2.members.set([user2, user3])

    # Crear actividades
    Activity.objects.create(user=user1, activity_type='Running', duration_minutes=30, calories_burned=300, performed_at=timezone.now())
    Activity.objects.create(user=user2, activity_type='Cycling', duration_minutes=45, calories_burned=400, performed_at=timezone.now())
    Activity.objects.create(user=user3, activity_type='Yoga', duration_minutes=60, calories_burned=200, performed_at=timezone.now())

    # Crear leaderboard
    LeaderboardEntry.objects.create(user=user1, points=1200, weekly_points=300)
    LeaderboardEntry.objects.create(user=user2, points=1500, weekly_points=400)
    LeaderboardEntry.objects.create(user=user3, points=900, weekly_points=200)

    # Crear sugerencias de entrenamiento
    WorkoutSuggestion.objects.create(user=user1, title='Cardio Blast', description='Entrenamiento intenso de cardio', difficulty='intermedio', estimated_minutes=40)
    WorkoutSuggestion.objects.create(user=user2, title='Strength Builder', description='Rutina para ganar fuerza', difficulty='avanzado', estimated_minutes=50)
    WorkoutSuggestion.objects.create(user=user3, title='Morning Yoga', description='Yoga para empezar el día', difficulty='principiante', estimated_minutes=30)

    print('Datos de prueba creados exitosamente.')

if __name__ == '__main__':
    create_test_data()
