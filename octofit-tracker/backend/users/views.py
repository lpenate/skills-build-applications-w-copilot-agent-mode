from django.contrib.auth import get_user_model
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import UserProfile
from .serializers import UserProfileSerializer, UserSerializer

User = get_user_model()


class UserViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = User.objects.all().order_by('id')
	serializer_class = UserSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
	queryset = UserProfile.objects.select_related('user').all().order_by('id')
	serializer_class = UserProfileSerializer


class LogoutView(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		if request.auth:
			request.auth.delete()
		return Response({'detail': 'Logged out successfully.'}, status=status.HTTP_200_OK)
