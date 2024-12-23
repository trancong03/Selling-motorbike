from django.conf import settings
from django.urls import path, include   # type: ignore
from users.views import user, post
from django.conf.urls.static import static
from . import views1, views2, views3, views5
from rest_framework.routers import DefaultRouter  # Nhập DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView # type: ignore
# router = DefaultRouter()
# router.register(r'followers', views3.FollowerViewSet)
urlpatterns = [
    path('login/', user.login, name='login'),
    path('register/', user.register, name='register'),
    path('users/<int:id>/', user.update_user, name='update_user'),
    path('update-images/', user.update_user_images, name='update_user_images'),
    path('reset-password/', user.reset_password, name='reset_password'),
    path('reset-password-forgot/', user.reset_password_forgot, name='reset_password_forgot'),
    path('forgot-password/', user.forgot_password, name='forgot_password'),  
    path('verify-otp/', user.verify_otp, name='verify_otp'),  
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('scan-cccd/', views1.scan_cccd, name='scan_cccd'),
    path('scan-cccd-back/', views5.scan_cccd_back, name='scan_cccd_back'),
    path('predict-price/', views2.predict_price, name='predict_price'),
    # path('followers/', include(router.urls)),
    # path('follow/<int:user_id>/', views3.follow_user, name='follow_user'),
    path('follow/<int:user_id>/', views3.follow_user, name='follow_user'),
    path('bai-viet/', post.get_all_bai_viet, name='get_all_bai_viet'),
    path('new-post/', post.tao_bai_viet, name='tao_bai_viet'),
    path('update-post/', post.sua_bai_viet, name='sua_bai_viet'),
    path('delete-post/<int:id>/', post.xoa_bai_viet, name='xoa_bai_viet'),
    path('post-id/<int:id>/', post.get_post_by_id, name='get_post_by_id'),
    path('post-like/<int:iduser>/', post.get_all_bai_viet_like, name='get_all_bai_viet_like'),
    path('post/<int:iduser>/', post.get_all_bai_viet_by_manguoidung, name='get_all_bai_viet_by_manguoidung'),
    path('user/<int:iduser>/', user.get_user, name='get_user'),
    path('like-post/', post.them_yeu_thich, name='them_yeu_thich'),
    path('islike-post/', post.kiem_tra_yeu_thich, name='them_yeu_thich'),
    path('get-like-post/<int:iduser>/', post.lay_list_yeu_thich, name='lay_list_yeu_thich'),
    path('remove-like-post/', post.xoa_yeu_thich, name='them_yeu_thich'),
    path('product/<int:product_id>/', post.get_all_product_image_by_id, name='get_all_product_image_by_id'),
    path('product_user/<int:product_id>/', post.get_user_by_id_post, name='get_all_product_image_by_id'),
    path('get_top_10_favorite_products/', post.get_top_10_favorite_products, name='get_top_10_favorite_products'),
    path('get_top_100_baiviet/', post.get_top_100_baiviet, name='get_top_10_favorite_products'),
    path('get_gia_tri_day_top/', post.get_gia_tri_day_top, name='get_gia_tri_day_top'),
    path('search_products/', post.search_products, name='search_products'),
    path('get_all_giao_dich/', post.get_all_giao_dich, name='get_all_giao_dich'),
    path('day-tin/', post.day_tin, name='day_tin'),  
    path('day-top/', post.day_top, name='day_tin'),  
    path('toggle-favorite/<str:username>/<int:product_id>/', post.toggle_favorite, name='toggle_favorite'),
    path('favorite-products/<int:username>/', post.get_favorite_products, name='get_favorite_products'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)