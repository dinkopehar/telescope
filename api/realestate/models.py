from datetime import datetime

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from django.contrib.auth.models import User


class Portfolio(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties')
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Property(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name='properties')
    address = models.PointField(null=False, blank=False)
    estimated_value = models.DecimalField(max_digits=10, decimal_places=2, help_text='Estimated value of the property')
    construction_year = models.PositiveIntegerField(validators=[MaxValueValidator(datetime.now().year), MinValueValidator(1960)], help_text='Year of construction')
    square_footage = models.PositiveIntegerField(help_text='Square footage of the property')
    image = models.ImageField(upload_to='properties', null=True, blank=True)

    class Meta:
        verbose_name_plural = "properties"

    def __str__(self):
        return f'{self.portfolio.name} - {self.estimated_value}'
