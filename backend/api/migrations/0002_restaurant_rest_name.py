# Generated by Django 4.2.10 on 2024-03-01 23:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurant',
            name='rest_name',
            field=models.CharField(default='name', max_length=20),
        ),
    ]
