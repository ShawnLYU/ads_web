# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import datetime

# Create your models here.
class RegistrationRecord(models.Model):
	# sid(string) | name(string) | mooncake(string) |water(string) | img_seq (string) | reg_time (datetime) | collect_group (string) | exp_group (string)
	sid = models.TextField(default='nil')
	name = models.TextField(default='nil')
	mooncake = models.TextField(default='nil')
	water = models.TextField(default='nil')
	# which image to display (split by ',')
	img_seq = models.TextField(default='nil')
	# access the recog page
	access_time = models.DateTimeField(default=datetime.datetime.now)
	# finish the recog page
	reg_time = models.DateTimeField(default=datetime.datetime.now)
	# collection time slot group
	collect_group = models.TextField(default='nil')
	# experiment group
	exp_group = models.TextField(default='nil')
	# images viewed
	tracking = models.IntegerField(default=0)
	# recog
	recog = models.TextField(default='nil')