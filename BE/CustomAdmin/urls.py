from rest_framework.routers import DefaultRouter
from django.urls import path, include
from CustomAdmin.views import AdminLoginAPIView, NguoiDungViewSet, BaiVietViewSet, GoiGiaoDichViewSet, HinhAnhViewSet, FollwerViewSet, NapDayTinViewSet, NapGiaHanViewSet, NapTienTaiKhoanViewSet, ThongBaoViewSet, GuiThongBaoAPIView, ThuocTinhHeThongViewSet, ThongBaoList
from CustomAdmin import views

router = DefaultRouter()
router.register(r'nguoidung', NguoiDungViewSet)
router.register(r'baiviet', BaiVietViewSet)
router.register(r'goigiaodich', GoiGiaoDichViewSet)
router.register(r'hinhanh', HinhAnhViewSet)
router.register(r'follower', FollwerViewSet)
router.register(r'napdaytin', NapDayTinViewSet)
router.register(r'napgiahan', NapGiaHanViewSet)
router.register(r'naptientaikhoan', NapTienTaiKhoanViewSet)
router.register(r'thongbao', ThongBaoViewSet)
router.register(r'thuoctinhhethong', ThuocTinhHeThongViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('admin-login/', AdminLoginAPIView.as_view(), name='admin-login'),
    path('gui-thong-bao/', GuiThongBaoAPIView.as_view(), name='gui-thong-bao'),
    path('save-thuoctinhhethong/', views.save_system_settings, name='save_system_settings'),
    path('thongbaonguoidung/<int:manguoidung>/', views.ThongBaoList.as_view(), name='thongbao-list'),
]
