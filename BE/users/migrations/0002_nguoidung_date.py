# Generated by Django 5.0.9 on 2024-12-21 07:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='nguoidung',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
    ]