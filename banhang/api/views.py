from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.response import Response
from banhang.api.auth import createToken
from banhang.models import NguoiMua
from .serializers import NguoiMuaSerializer


class SignUpRoute(APIView):
    def post(self, request):
        try:
            user = NguoiMua.objects.get(sdt=request.data['sdt'])
            return Response({'error': {}, 'message': 'Số điện thoại đã tồn tại'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            request.data['token'] = createToken()
            serialier = NguoiMuaSerializer(data=request.data)
            if serialier.is_valid():
                serialier.save()
                return Response({'data': serialier.data, 'message': 'Tạo tài khoản thành công'}, status=status.HTTP_200_OK)
            return Response({'error': serialier.errors, 'message': 'Thông tin không đúng định dạng'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginRoute(APIView):
    def post(self, request):
        try:
            user = NguoiMua.objects.get(sdt=request.data['sdt'], password=request.data['password']) 
            print(user)
            user.token = createToken()
            user.save()
            response = Response({"data": { 'token': user.token }, "message": "Đăng nhập thành công"}, status=status.HTTP_200_OK)
            response.set_cookie('token', user.token)
            return response
        except:
            return Response({"error": {}, "message": "Thông tin không chính xác"}, status=status.HTTP_401_UNAUTHORIZED)