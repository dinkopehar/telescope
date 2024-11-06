from rest_framework import serializers
from .models import Portfolio, Property


class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ['id', 'name']


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = [
            'id',
            'portfolio',
            'address',
            'estimated_value',
            'construction_year',
            'square_footage',
            'image',
        ]
