# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0006_auto_20170919_0842'),
    ]

    operations = [
        migrations.AddField(
            model_name='registrationrecord',
            name='tracking',
            field=models.IntegerField(default=0),
        ),
    ]
