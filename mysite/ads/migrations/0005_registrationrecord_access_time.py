# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0004_registrationrecord_mooncake'),
    ]

    operations = [
        migrations.AddField(
            model_name='registrationrecord',
            name='access_time',
            field=models.DateTimeField(default=datetime.datetime(2017, 9, 2, 8, 20, 7, 176002, tzinfo=utc), auto_now=True),
            preserve_default=False,
        ),
    ]
