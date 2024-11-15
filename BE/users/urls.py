from django.urls import path
from users.views import user , post
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', user.login, name='login'),
    path('users/<int:id>/', user.update_user, name='update_user'),
    path('update-images/', user.update_user_images, name='update_user_images'),
    path('reset-password/', user.reset_password, name='reset_password'),
    path('reset-password-forgot/', user.reset_password_forgot, name='reset_password_forgot'),
    path('forgot-password/', user.forgot_password, name='forgot_password'),  
    path('verify-otp/', user.verify_otp, name='verify_otp'),  
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('bai-viet/', post.get_all_bai_viet, name='get_all_bai_viet'),
]
