from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def nguoimua(request):
   response = HttpResponse()
   response.writelines('<h1>Xin chào</h1>')
   response.write('Đây là trang mua')
   return response

def trangchu(request):
   response = HttpResponse()
   response.writelines('<h1>Xin chào</h1>')
   response.write('Đây là trang chủ')
   return response

def signin(request):
    return render(request, 'banhang/signin.html')

def signup(request):
    return render(request, 'banhang/signup.html')