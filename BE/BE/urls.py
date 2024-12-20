from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from users import views1, views2, views3
urlpatterns = [
    path('admin-api/', include('CustomAdmin.urls')),
    path('api/', include('users.urls')),  # Thêm đường dẫn tới ứng dụng 'users'
    path('payment/', include('payment.urls')),
    # path('api/', include('followers.urls')),
]
# Chỉ thêm khi chạy trong môi trường phát triển (dev)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)