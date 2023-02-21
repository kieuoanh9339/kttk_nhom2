from django.db import models

# Create your models here.

class NguoiMua(models.Model):
    def __str__(self):
        return self.ten

    ten=models.CharField(max_length=20)
    sdt=models.CharField(max_length=20,primary_key=True)
    password= models.CharField(max_length=20)
    email=models.CharField(max_length=100)
    namsinh=models.CharField(max_length=20)
    token = models.CharField(max_length=1000, default=None, null=True)
