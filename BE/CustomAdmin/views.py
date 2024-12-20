from rest_framework import viewsets
from .models import NguoiDung, BaiViet, GoiGiaoDich, HinhAnh, Follwer, NapDayTin, NapGiaHan, NapTienTaiKhoan, ThongBao, ThuocTinhHeThong, Voucher
from .serializers import NguoiDungSerializer, BaiVietSerializer, GoiGiaoDichSerializer, GoiGiaoDichSerializer, HinhAnhSerializer, FollwerSerializer, NapDayTinSerializer, NapGiaHanSerializer, NapTienTaiKhoanSerializer, ThongBaoSerializer, ThuocTinhHeThongSerializer, SystemSettingsSerializer, ThongBaoNguoiDungSerializer, VoucherSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.contrib.auth.hashers import check_password
from django.db.models import Q
from rest_framework.views import APIView


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

class VoucherViewSet(viewsets.ModelViewSet):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer

class ThongBaoList(APIView):
    def get(self, request, manguoidung, format=None):
        # Lọc thông báo theo mã người dùng
        thongbaos = ThongBao.objects.filter(manguoidung=manguoidung)
        serializer = ThongBaoSerializer(thongbaos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ThuocTinhHeThongViewSet(viewsets.ModelViewSet):
    queryset = ThuocTinhHeThong.objects.all()
    serializer_class = ThuocTinhHeThongSerializer

from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth.hashers import check_password, make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import NguoiDung
from .serializers import NguoiDungSerializer
class AdminLoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({"detail": "Vui lòng cung cấp đầy đủ tên đăng nhập và mật khẩu"}, status=status.HTTP_400_BAD_REQUEST)
        
        password = password.strip()  # cai nay khhong can cung duoc vi da co check trong ham
        
        try:
            user = NguoiDung.objects.get(username=username)
        except NguoiDung.DoesNotExist:
            return Response({"detail": "Người dùng không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
        
        if not check_password(password.strip(), user.password.strip()):
            return Response({"detail": "Sai mật khẩu"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not user.is_superuser:
            return Response({"detail": "Người dùng không phải admin"}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = NguoiDungSerializer(user)
        return Response({
            "message": "Đăng nhập thành công",
            "user": serializer.data
        }, status=status.HTTP_200_OK)
from django.utils import timezone
class GuiThongBaoAPIView(APIView):

    def post(self, request, *args, **kwargs):
        # Lấy dữ liệu từ request
        bai_viet_id = request.data.get('bai_viet_id')
        title = request.data.get('title')
        message = request.data.get('message')
        user_id = request.data.get('user_id')  # Giữ lại user_id

        # Kiểm tra xem có đủ thông tin không
        if not title or not message or not user_id:
            return Response({"detail": "Vui lòng cung cấp đầy đủ thông tin"}, status=status.HTTP_400_BAD_REQUEST)

        # Kiểm tra xem người dùng có tồn tại hay không
        try:
            user = NguoiDung.objects.get(iduser=user_id)  # Kiểm tra người dùng
        except NguoiDung.DoesNotExist:
            return Response({"detail": "Người dùng không tồn tại"}, status=status.HTTP_404_NOT_FOUND)

        # Nếu có bai_viet_id, kiểm tra bài viết có tồn tại hay không
        bai_viet = None
        if bai_viet_id:
            try:
                bai_viet = BaiViet.objects.get(mabaiviet=bai_viet_id)
            except BaiViet.DoesNotExist:
                return Response({"detail": "Bài viết không tồn tại"}, status=status.HTTP_404_NOT_FOUND)

        # Tạo thông báo mới
        thong_bao = ThongBao.objects.create(
            manguoidung=user,   # Sử dụng đúng trường manguoidung
            mabaiviet=bai_viet, # Có thể là None nếu không có bài viết
            tieude=title,       # Sử dụng đúng trường tieude
            noidung=message,    # Sử dụng đúng trường noidung
            thoigiangui=timezone.now()
        )
        
        # Serialize thông báo và trả về phản hồi
        serializer = ThongBaoNguoiDungSerializer(thong_bao)
        return Response({
            "message": "Thông báo đã được gửi thành công",
            "notification": serializer.data
        }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def save_system_settings(request):
    if request.method == 'POST':
        # Lấy dữ liệu và lưu vào database
        serializer = SystemSettingsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
