from django.conf import settings
from django.db import models


class Team(models.Model):
	name = models.CharField(max_length=120, unique=True)
	description = models.TextField(blank=True)
	members = models.ManyToManyField('users.OctoUser', related_name='teams', blank=True)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.name
