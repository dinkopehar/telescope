# Generated by Django 5.1.2 on 2024-11-06 13:34

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('realestate', '0002_property_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='properties'),
        ),
    ]
