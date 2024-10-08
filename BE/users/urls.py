from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [
    path('login/', views.login, name='login'),
    path('users/', views.get_all_users, name='get_all_users'),
    path('api/users/<str:id>/', views.update_user, name='update_user'), 
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
