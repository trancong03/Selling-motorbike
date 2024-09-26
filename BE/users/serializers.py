# Myapp/serializers.py

from rest_framework import serializers
from .models import NguoiDung

class NguoiDungSerializer(serializers.ModelSerializer):
    class Meta:
        model = NguoiDung
        fields = '__all__' 
    