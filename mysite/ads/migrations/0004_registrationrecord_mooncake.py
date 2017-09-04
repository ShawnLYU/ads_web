# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0003_auto_20170831_1652'),
    ]

    operations = [
        migrations.AddField(
            model_name='registrationrecord',
            name='mooncake',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
    ]
