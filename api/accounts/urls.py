from django.contrib.auth import get_user_model
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='accounts_register'),
    path('login/', TokenObtainPairView.as_view(), name='accounts_login'),
    path('refresh/', TokenRefreshView.as_view(), name='accounts_refresh'),
    path('test/', views.TestView.as_view(), name='accounts_test'),
]
