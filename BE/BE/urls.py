from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin-api/', include('CustomAdmin.urls')),
    path('api/', include('users.urls')),  # Thêm đường dẫn tới ứng dụng 'users'
    path('payment/', include('payment.urls')),
    # path('api/', include('followers.urls')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)