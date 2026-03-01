
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class OctoUserManager(BaseUserManager):
	def create_user(self, username, email=None, password=None, **extra_fields):
		if not username:
			raise ValueError('El usuario debe tener un nombre de usuario')
		user = self.model(username=username, email=email, **extra_fields)
		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self, username, email=None, password=None, **extra_fields):
		extra_fields.setdefault('is_staff', True)
		extra_fields.setdefault('is_superuser', True)
		return self.create_user(username, email, password, **extra_fields)

class OctoUser(AbstractBaseUser, PermissionsMixin):
	id = models.CharField(primary_key=True, max_length=24, editable=False)
	username = models.CharField(max_length=150, unique=True)
	email = models.EmailField(blank=True, null=True)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)
	date_joined = models.DateTimeField(auto_now_add=True)

	USERNAME_FIELD = 'username'
	REQUIRED_FIELDS = []

	objects = OctoUserManager()

	def __str__(self):
		return self.username

class UserProfile(models.Model):
	user = models.OneToOneField('OctoUser', on_delete=models.CASCADE, related_name='profile')
	age = models.PositiveIntegerField(null=True, blank=True)
	height_cm = models.FloatField(null=True, blank=True)
	weight_kg = models.FloatField(null=True, blank=True)
	fitness_goal = models.CharField(max_length=120, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return f"Profile for {self.user.username}"
