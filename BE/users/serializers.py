from rest_framework import serializers
from .models import (
    BaiViet,
    HinhAnh,
    NguoiDung,
    YeuThich
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
class YeuThichSerializer(serializers.ModelSerializer):
    class Meta:
        model = YeuThich
        fields = '__all__'
