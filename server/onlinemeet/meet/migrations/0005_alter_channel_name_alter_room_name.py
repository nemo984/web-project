# Generated by Django 4.1.3 on 2022-11-12 08:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meet', '0004_channel_owner_alter_channel_members'),
    ]

    operations = [
        migrations.AlterField(
            model_name='channel',
            name='name',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='room',
            name='name',
            field=models.CharField(max_length=50),
        ),
    ]