from django.db import models

class NguoiDung(models.Model):
    iduser = models.CharField(max_length=10, unique=True, primary_key=True) 
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=50)
    fullname = models.CharField(max_length=50)
    birthdate = models.DateField()
    email = models.EmailField()
    address = models.TextField()
    phone = models.CharField(max_length=12)
    gender = models.CharField(max_length=4)
    identity_card = models.CharField(max_length=20)
    avatar = models.CharField(max_length=50)
    background =models.CharField(max_length=50)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    class Meta:
        db_table = 'NguoiDung' 
    def __str__(self):
        return self.fullname
