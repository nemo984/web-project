# Generated by Django 4.1.3 on 2022-11-09 04:28

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('meet', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='channelmember',
            options={'ordering': ('join_date',)},
        ),
        migrations.RemoveField(
            model_name='channel',
            name='owner',
        ),
        migrations.RemoveField(
            model_name='channelmember',
            name='number',
        ),
        migrations.AddField(
            model_name='channelmember',
            name='join_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='channelmember',
            name='role',
            field=models.CharField(choices=[('OWNER', 'Owner'), ('ADMIN', 'Admin'), ('MEMBER', 'Member')], default='member', max_length=50),
        ),
    ]
