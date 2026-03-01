import os

from django.contrib import admin
from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.routers import DefaultRouter
from activities.views import ActivityViewSet
from leaderboard.views import LeaderboardEntryViewSet
from teams.views import TeamViewSet
from users.views import LogoutView, UserProfileViewSet, UserViewSet
from workouts.views import WorkoutSuggestionViewSet

codespace_name = os.environ.get('CODESPACE_NAME')
if codespace_name:
    base_url = f"https://{codespace_name}-8000.app.github.dev"
else:
    base_url = "http://localhost:8000"

router = DefaultRouter()
router.register('users', UserViewSet, basename='users')
router.register('profiles', UserProfileViewSet, basename='profiles')
router.register('activities', ActivityViewSet, basename='activities')
router.register('teams', TeamViewSet, basename='teams')
router.register('leaderboard', LeaderboardEntryViewSet, basename='leaderboard')
router.register('workouts', WorkoutSuggestionViewSet, basename='workouts')


@api_view(['GET'])
def api_root(request):
    return Response({
        'base_url': base_url,
        'admin': f"{base_url}/admin/",
        'users': f"{base_url}/api/users/",
        'profiles': f"{base_url}/api/profiles/",
        'activities': f"{base_url}/api/activities/",
        'teams': f"{base_url}/api/teams/",
        'leaderboard': f"{base_url}/api/leaderboard/",
        'workouts': f"{base_url}/api/workouts/",
        'login': f"{base_url}/api/auth/login/",
        'logout': f"{base_url}/api/auth/logout/",
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', api_root, name='api-root'),
    path('api/auth/login/', obtain_auth_token, name='api-login'),
    path('api/auth/logout/', LogoutView.as_view(), name='api-logout'),
    path('api/', include(router.urls)),
]
