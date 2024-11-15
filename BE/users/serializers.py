from rest_framework import serializers
from .models import (
    BaiViet,
    HinhAnh,
    NguoiDung,
)

class BaiVietSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaiViet
        fields = '__all__'


class HinhAnhSerializer(serializers.ModelSerializer):
    class Meta:
        model = HinhAnh
        fields = '__all__'

class NguoiDungSerializer(serializers.ModelSerializer):
    class Meta:
        model = NguoiDung
        fields = '__all__'
