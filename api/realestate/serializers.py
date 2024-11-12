from rest_framework import serializers
from .models import Portfolio, Property
from drf_extra_fields.geo_fields import PointField


class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ['id', 'name']


class PropertySerializer(serializers.ModelSerializer):
    address = PointField(required=True)

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


class DashboardSerializer(serializers.Serializer):
    # TODO
    number_of_portfolios = serializers.IntegerField()
    number_of_properties = serializers.IntegerField()
    estimated_value_of_properties = serializers.IntegerField()
