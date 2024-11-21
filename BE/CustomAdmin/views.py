from rest_framework import viewsets
from .models import NguoiDung, BaiViet, GoiGiaoDich, HinhAnh, Follwer, NapDayTin, NapGiaHan, NapTienTaiKhoan, ThongBao, ThuocTinhHeThong
from .serializers import NguoiDungSerializer, BaiVietSerializer, GoiGiaoDichSerializer, GoiGiaoDichSerializer, HinhAnhSerializer, FollwerSerializer, NapDayTinSerializer, NapGiaHanSerializer, NapTienTaiKhoanSerializer, ThongBaoSerializer, ThuocTinhHeThongSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.contrib.auth.hashers import check_password
from django.db.models import Q



class NguoiDungViewSet(viewsets.ModelViewSet):
    queryset = NguoiDung.objects.all()
    serializer_class = NguoiDungSerializer

class BaiVietViewSet(viewsets.ModelViewSet):
    queryset = BaiViet.objects.all()
    serializer_class = BaiVietSerializer


class GoiGiaoDichViewSet(viewsets.ModelViewSet):
    queryset = GoiGiaoDich.objects.all()
    serializer_class = GoiGiaoDichSerializer

class HinhAnhViewSet(viewsets.ModelViewSet):
    queryset = HinhAnh.objects.all()
    serializer_class = HinhAnhSerializer

class FollwerViewSet(viewsets.ModelViewSet):
    queryset = Follwer.objects.all()
    serializer_class = FollwerSerializer

class NapDayTinViewSet(viewsets.ModelViewSet):
    queryset = NapDayTin.objects.all()
    serializer_class = NapDayTinSerializer

class NapGiaHanViewSet(viewsets.ModelViewSet):
    queryset = NapGiaHan.objects.all()
    serializer_class = NapGiaHanSerializer

class NapTienTaiKhoanViewSet(viewsets.ModelViewSet):
    queryset = NapTienTaiKhoan.objects.all()
    serializer_class = NapTienTaiKhoanSerializer

class ThongBaoViewSet(viewsets.ModelViewSet):
    queryset = ThongBao.objects.all()
    serializer_class = ThongBaoSerializer

class ThuocTinhHeThongViewSet(viewsets.ModelViewSet):
    queryset = ThuocTinhHeThong.objects.all()
    serializer_class = ThuocTinhHeThongSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate

class AdminLoginView(APIView):
    def post(self, request):
        # Lấy username và password từ request
        username = request.data.get('username')
        password = request.data.get('password')

        # Kiểm tra xem username hoặc password có bị thiếu không
        if not username or not password:
            return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Tìm người dùng dựa trên username
            user = NguoiDung.objects.filter(Q(username=username) & Q(password=password)).first()

            if user:
                # Trả về thành công nếu tìm thấy người dùng
                return Response({
                    'username': user.username,
                    'is_superuser': user.is_superuser
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # Xử lý lỗi bất kỳ
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)