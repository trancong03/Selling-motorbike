from django.urls import path
from . import views
from . import views1
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', views.login, name='login'),
    path('users/<str:id>/', views.update_user, name='update_user'),
    path('update-images/', views.update_user_images, name='update_user_images'),
    path('reset-password/', views.reset_password, name='reset_password'),
    path('reset-password-forgot/', views.reset_password_forgot, name='reset_password_forgot'),
    path('forgot-password/', views.forgot_password, name='forgot_password'),  
    path('verify-otp/', views.verify_otp, name='verify_otp'),  
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('scan-cccd/', views1.scan_cccd, name='scan_cccd'),
]
