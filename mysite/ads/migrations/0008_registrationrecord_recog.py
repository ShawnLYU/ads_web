# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0007_registrationrecord_tracking'),
    ]

    operations = [
        migrations.AddField(
            model_name='registrationrecord',
            name='recog',
            field=models.TextField(default='nil'),
        ),
    ]
