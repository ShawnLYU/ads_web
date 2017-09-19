# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0005_registrationrecord_access_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registrationrecord',
            name='collect_group',
            field=models.TextField(default='nil'),
        ),
        migrations.AlterField(
            model_name='registrationrecord',
            name='exp_group',
            field=models.TextField(default='nil'),
        ),
        migrations.AlterField(
            model_name='registrationrecord',
            name='img_seq',
            field=models.TextField(default='nil'),
        ),
        migrations.AlterField(
            model_name='registrationrecord',
            name='mooncake',
            field=models.TextField(default='nil'),
        ),
        migrations.AlterField(
            model_name='registrationrecord',
            name='name',
            field=models.TextField(default='nil'),
        ),
        migrations.AlterField(
            model_name='registrationrecord',
            name='sid',
            field=models.TextField(default='nil'),
        ),
        migrations.AlterField(
            model_name='registrationrecord',
            name='water',
            field=models.TextField(default='nil'),
        ),
    ]
