from django.urls import path, include
from django.contrib import admin

from . import views

urlpatterns = [
    path('auth/register/', views.SignUpRoute.as_view()),
    path('auth/login/', views.LoginRoute.as_view()),
]