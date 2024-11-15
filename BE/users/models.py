from django.db import models

class NguoiDung(models.Model):
    manguoidung = models.AutoField(primary_key=True)
    tendangnhap = models.CharField(max_length=20, null=True, blank=True)
    matkhau = models.CharField(max_length=50, null=True, blank=True)
    hoten = models.CharField(max_length=50, null=True, blank=True)
    ngaysinh = models.DateField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    diachi = models.CharField(max_length=255, null=True, blank=True)
    sodienthoai = models.CharField(max_length=12, null=True, blank=True)
    gioitinh = models.CharField(max_length=4, null=True, blank=True)
    socccd = models.CharField(max_length=12, null=True, blank=True)
    mota = models.CharField(max_length=255, null=True, blank=True)
    anhdaidien = models.CharField(max_length=50, null=True, blank=True)
    anhnen = models.CharField(max_length=10, null=True, blank=True)
    is_superuser = models.BooleanField(default=False)
    sodu = models.DecimalField(max_digits=19, decimal_places=4, null=True, blank=True)

    class Meta:
        db_table = 'NGUOIDUNG'  # Custom table name

    def __str__(self):
        return self.hoten


class BaiViet(models.Model):
    mabaiviet = models.AutoField(primary_key=True)
    maxe = models.IntegerField(null=True, blank=True)
    manguoidung = models.ForeignKey(NguoiDung, null=True, blank=True, on_delete=models.CASCADE)
    magd = models.CharField(max_length=10, null=True, blank=True)
    tieude = models.CharField(max_length=75, null=True, blank=True)
    noidung = models.TextField(null=True, blank=True)
    thongtinlienlac = models.CharField(max_length=200, null=True, blank=True)
    mota = models.TextField(null=True, blank=True)
    diachibaiviet = models.TextField(null=True, blank=True)
    giatri = models.DecimalField(max_digits=19, decimal_places=4, null=True, blank=True)
    ngaydang = models.DateTimeField(null=True, blank=True)
    ngayhethan = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'BAIVIET'  # Custom table name

    def __str__(self):
        return self.tieude


class HinhAnh(models.Model):
    mabaiviet = models.ForeignKey(BaiViet, on_delete=models.CASCADE)
    mahinhanh = models.AutoField(primary_key=True)
    tenfile = models.CharField(max_length=255)

    class Meta:
        db_table = 'HINHANH'  # Custom table name for the images

    def __str__(self):
        return self.tenfile


class Xe(models.Model):
    maxe = models.AutoField(primary_key=True)
    tenxe = models.CharField(max_length=50, null=True, blank=True)
    loaixe = models.CharField(max_length=25, null=True, blank=True)
    hangxe = models.CharField(max_length=15, null=True, blank=True)
    biensoxe = models.CharField(max_length=10, null=True, blank=True)
    nammua = models.DateTimeField(null=True, blank=True)
    dungtich = models.CharField(max_length=5, null=True, blank=True)
    sokmdadi = models.BigIntegerField(null=True, blank=True)
    mausac = models.CharField(max_length=15, null=True, blank=True)
    thongso = models.CharField(max_length=200, null=True, blank=True)
    tinhtrangxe = models.CharField(max_length=15, null=True, blank=True)
    giaban = models.CharField(max_length=10, null=True, blank=True)
    
   
    class Meta:
        db_table = 'XE'  # Custom table name for vehicles

    def __str__(self):
        return self.tenxe
