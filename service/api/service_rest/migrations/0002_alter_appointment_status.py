# Generated by Django 4.0.3 on 2023-09-07 01:17

from django.db import migrations, models
import service_rest.models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.CharField(max_length=200, validators=[service_rest.models.validate_status]),
        ),
    ]