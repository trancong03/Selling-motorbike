from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('users/', views.get_all_users, name='get_all_users'),
]
