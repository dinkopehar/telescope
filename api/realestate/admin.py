from django.contrib.gis import admin
from .models import Property, Portfolio

admin.site.register(Portfolio, admin.ModelAdmin)
admin.site.register(Property, admin.ModelAdmin)
