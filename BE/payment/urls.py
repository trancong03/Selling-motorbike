from django.urls import path
from .views import create_payment, payment_ipn

urlpatterns = [
    path('create/', create_payment, name='create_payment'),
    path('ipn/', payment_ipn, name='payment_ipn'),
]