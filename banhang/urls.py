from django.urls import include, path
from . import views
from banhang.api import urls as api_urls
urlpatterns = [
   path('nguoimua', views.nguoimua, name='nguoimua'),
   path('home', views.trangchu, name='trangchu'),
   path('signin',views.signin,name='signin'),
   path('signup',views.signup,name='signup'),
   path('api/', include(api_urls)),
]