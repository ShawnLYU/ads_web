# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0008_registrationrecord_recog'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registrationrecord',
            name='access_time',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='registrationrecord',
            name='reg_time',
            field=models.DateTimeField(),
        ),
    ]
