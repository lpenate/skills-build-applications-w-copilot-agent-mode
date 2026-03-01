from django.test import TestCase
from .models import Team

class TeamModelTest(TestCase):
	def test_create_team(self):
		team = Team.objects.create(name='EquipoTest', description='Equipo de prueba')
		self.assertEqual(team.name, 'EquipoTest')
