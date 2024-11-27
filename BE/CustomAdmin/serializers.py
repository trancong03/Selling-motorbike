from rest_framework import serializers
from .models import *


class NguoiDungSerializer(serializers.ModelSerializer):
    class Meta:
        model = NguoiDung
        fields = '__all__'

class BaiVietSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaiViet
        fields = '__all__'


class GoiGiaoDichSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoiGiaoDich
        fields = '__all__'

class HinhAnhSerializer(serializers.ModelSerializer):
    class Meta:
        model = HinhAnh
        fields = '__all__'

class FollwerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follwer
        fields = '__all__'

class NapDayTinSerializer(serializers.ModelSerializer):
    class Meta:
        model = NapDayTin
        fields = '__all__'

class NapGiaHanSerializer(serializers.ModelSerializer):
    class Meta:
        model = NapGiaHan
        fields = '__all__'

class NapTienTaiKhoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = NapTienTaiKhoan
        fields = '__all__'

class ThongBaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThongBao
        fields = '__all__'

class ThuocTinhHeThongSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThuocTinhHeThong
        fields = '__all__'  # Bao gồm tất cả các trường trong bảng, kể cả trường id

class SystemSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThuocTinhHeThong
        fields = '__all__'