from rest_framework import serializers
from ..models import NguoiMua

class NguoiMuaSerializer(serializers.ModelSerializer):
   
    class Meta:
        model= NguoiMua
        fields = ['ten','sdt', 'password','email', 'namsinh',  'token']