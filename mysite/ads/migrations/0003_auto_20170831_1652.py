# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0002_registrationrecord_group'),
    ]

    operations = [
        migrations.RenameField(
            model_name='registrationrecord',
            old_name='group',
            new_name='collect_group',
        ),
        migrations.AddField(
            model_name='registrationrecord',
            name='exp_group',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
    ]
