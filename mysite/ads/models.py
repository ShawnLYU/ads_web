# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class RegistrationRecord(models.Model):
	# sid(string) | name(string) | mooncake(string) |water(string) | img_seq (string) | reg_time (datetime) | collect_group (string) | exp_group (string)
	sid = models.TextField()
	name = models.TextField()
	mooncake = models.TextField()
	water = models.TextField()
	# which image to display (split by ',')
	img_seq = models.TextField()
	# access this website  time
	access_time = models.DateTimeField()
	# registration time
	reg_time = models.DateTimeField(auto_now=True)
	# collection time slot group
	collect_group = models.TextField()
	# experiment group
	exp_group = models.TextField()