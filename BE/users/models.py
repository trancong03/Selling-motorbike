from django.db import models

class NguoiDung(models.Model):
    GENDER_CHOICES = [
        ('male', 'Nam'),
        ('female', 'Nữ'),
        ('other', 'Khác'),
    ]

    iduser = models.CharField(max_length=10, unique=True, primary_key=True) 
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=128)  # Đảm bảo mật khẩu được hash
    fullname = models.CharField(max_length=50)
    birthdate = models.DateField()
    email = models.EmailField(unique=True)
    address = models.TextField()
    phone = models.CharField(max_length=12)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    identity_card = models.CharField(max_length=20, unique=True)
    discription = models.CharField(max_length=255, blank=True, null=True)
    avatar = models.CharField(max_length=50, blank=True, null=True)  # Hoặc ImageField nếu cần
    background = models.CharField(max_length=50, blank=True, null=True)  # Hoặc FileField nếu cần
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    class Meta:
        db_table = 'NguoiDung'
    
    def __str__(self):
        return self.fullname
