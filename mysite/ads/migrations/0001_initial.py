# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='RegistrationRecord',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('sid', models.TextField()),
                ('name', models.TextField()),
                ('water', models.TextField()),
                ('img_seq', models.TextField()),
                ('reg_time', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
