# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0009_auto_20171001_1400'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registrationrecord',
            name='access_time',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
        migrations.AlterField(
            model_name='registrationrecord',
            name='reg_time',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
    ]
