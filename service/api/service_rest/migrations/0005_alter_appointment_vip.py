# Generated by Django 4.0.3 on 2023-09-08 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0004_appointment_vip'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='vip',
            field=models.CharField(max_length=200),
        ),
    ]
