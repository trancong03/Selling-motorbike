from django.db import models
from PIL import Image
import os
from django.contrib.auth.models import User  # Nhập User ở đây

class Follower(models.Model):
    user = models.ForeignKey(User, related_name='followers', on_delete=models.CASCADE)
    followed_user = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user} follows {self.followed_user}"

class LocalImage(models.Model):
    image = models.ImageField(upload_to='')  # Lưu ảnh trực tiếp vào REACT_IMAGE_DIR
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.resize_image()

    def resize_image(self):
        img_path = self.image.path
        max_width, max_height = 800, 800  # Giới hạn kích thước ảnh
        img = Image.open(img_path)
        if img.width > max_width or img.height > max_height:
            img.thumbnail((max_width, max_height), Image.ANTIALIAS)
            img.save(img_path, quality=85)  # Nén ảnh với chất lượng 85%



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
    date = models.DateField(null=True, blank=True)
    class Meta:
        db_table = 'NGUOIDUNG'  # Custom table name

    def __str__(self):
        return self.hoten


class BaiViet(models.Model):
    mabaiviet = models.AutoField(primary_key=True)  # Tự động tăng, là khóa chính
    manguoidung = models.IntegerField(null=True, blank=True)  # Sử dụng IntegerField để phù hợp với kiểu int
    magd = models.CharField(max_length=10, null=True, blank=True)  # Trường magd kiểu char(10)
    tieude = models.CharField(max_length=75, null=True, blank=True)  # Trường tiêu đề
    noidung = models.TextField(null=True, blank=True)  # Trường nội dung là TextField
    thongtinlienlac = models.CharField(max_length=200, null=True, blank=True)  # Thông tin liên lạc
    mota = models.TextField(null=True, blank=True)  # Mô tả là TextField
    diachibaiviet = models.CharField(max_length=200, null=True, blank=True)  # Địa chỉ bài viết
    giatri = models.DecimalField(max_digits=19, decimal_places=4, null=True, blank=True)  # Giá trị
    ngaydang = models.DateField(null=True, blank=True)  # Ngày đăng (sử dụng DateField thay vì DateTimeField)
    ngayhethan = models.DateField(null=True, blank=True) # Ngày hết hạn (sử dụng DateField)
    hangxe = models.CharField(max_length=15, null=True, blank=True)  # Hãng xe
    loaixe = models.CharField(max_length=25, null=True, blank=True)  # Loại xe
    nammua = models.IntegerField(null=True, blank=True)  # Năm mua
    dungtich = models.CharField(max_length=50, null=True, blank=True)  # Dung tích
    sokmdadi = models.BigIntegerField(null=True, blank=True)  # Số km đã đi
    baohanh = models.CharField(max_length=40, null=True, blank=True)  # Bảo hành
    xuatxu = models.CharField(max_length=30, null=True, blank=True)  # Xuất xứ
    tinhtrangxe = models.CharField(max_length=30, null=True, blank=True)  # Tình trạng xe
    giaban = models.CharField(max_length=10, null=True, blank=True)  # Giá bán
    status = models.IntegerField()

    class Meta:
        db_table = 'BAIVIET'  # Tên bảng trong cơ sở dữ liệu

  

class HinhAnh(models.Model):
    mahinhanh = models.AutoField(primary_key=True)
    mabaiviet = models.IntegerField()
    tenfile = models.CharField(max_length=255)

    class Meta:
        db_table = 'HINHANH'  # Custom table name for the images

    def __str__(self):
        return self.tenfile
class YeuThich(models.Model):
    mayt = models.AutoField(primary_key=True)
    manguoidung = models.IntegerField(db_column='MANGUOIDUNG')  # Map với cột MANGUOIDUNG
    mabaiviet = models.IntegerField(db_column='MABAIVIET')

    class Meta:
        db_table = 'YEUTHICH'  # Custom table name for the images

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
class GOIGIAODICH(models.Model):
    MALOAIGIAODICH = models.CharField(max_length=255,primary_key=True)
    TENLOAIGIAODICH = models.IntegerField()
    SOTIEN = models.CharField(max_length=255)
    SONGAY = models.IntegerField(max_length=255)

    class Meta:
        db_table = 'GOIGIAODICH'  # Custom table name for the images

class NAPGIAHAN(models.Model):
    MAGIAODICH = models.AutoField(primary_key=True)
    MALOAIGIAODICH = models.CharField(max_length=255)
    MANGUOIDUNG = models.IntegerField()
    MABAIVIET = models.IntegerField()
    SOTIEN = models.CharField(max_length=255)
    NGAYGIAODICH = models.DateField(max_length=255)
    class Meta:
        db_table = 'NAPGIAHAN'  # Custom table name for the images

class NAPDAYTIN(models.Model):
    MAGD = models.AutoField(primary_key=True)
    MANGUOIDUNG = models.IntegerField()
    MABAIVIET = models.IntegerField()
    NGAY = models.DateTimeField(max_length=255)
    class Meta:
        db_table = 'NAPDAYTIN'  # Custom table name for the images



