from django.db import models

class NguoiDung(models.Model):
    iduser = models.CharField(max_length=20, primary_key=True, db_column='MANGUOIDUNG')
    username = models.CharField(max_length=20, null=True, blank=True, db_column='TENDANGNHAP')
    password = models.CharField(max_length=50, null=True, blank=True, db_column='MATKHAU')
    fullname = models.CharField(max_length=50, null=True, blank=True, db_column='HOTEN')
    birthdate = models.DateField(null=True, blank=True, db_column='NGAYSINH')
    email = models.EmailField(max_length=50, null=True, blank=True, db_column='EMAIL')
    address = models.CharField(max_length=255, null=True, blank=True, db_column='DIACHI')
    phone = models.CharField(max_length=12, null=True, blank=True, db_column='SODIENTHOAI')
    gender = models.CharField(max_length=4, null=True, blank=True, db_column='GIOITINH')
    identity_card = models.CharField(max_length=12, null=True, blank=True, db_column='SOCCCD')
    discription = models.TextField(null=True, blank=True, db_column='MOTA')
    avatar = models.CharField(max_length=50, null=True, blank=True, db_column='ANHDAIDIEN')
    background = models.CharField(max_length=10, null=True, blank=True, db_column='ANHNEN')
    balance = models.DecimalField(max_digits=19, decimal_places=4, null=True, blank=True, db_column='SODU')
    is_superuser = models.BooleanField(null=True, blank=True, db_column='is_superuser')  # Thêm trường is_superuser
    class Meta:
        db_table = 'NGUOIDUNG'
        managed = False


class BaiViet(models.Model):
    mabaiviet = models.AutoField(primary_key=True, db_column='MABAIVIET')
    manguoidung = models.ForeignKey(
        'NguoiDung', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        db_column='MANGUOIDUNG'
    )
    magd = models.CharField(max_length=10, null=True, db_column='MAGD')
    tieude = models.CharField(max_length=75, null=True, db_column='TIEUDE')
    noidung = models.TextField(null=True, db_column='NOIDUNG')
    thongtinlienlac = models.CharField(max_length=200, null=True, db_column='THONGTINLIENLAC')
    mota = models.TextField(null=True, db_column='MOTA')
    diachibaiviet = models.TextField(null=True, db_column='DIACHIBAIVIET')
    giatri = models.DecimalField(max_digits=19, decimal_places=4, null=True, db_column='GIATRI')
    ngaydang = models.DateField(null=True, db_column='NGAYDANG')
    ngayhethan = models.DateField(null=True, db_column='NGAYHETHAN')
    hangxe = models.CharField(max_length=15, null=True, db_column='HANGXE')
    loaixe = models.CharField(max_length=25, null=True, db_column='LOAIXE')
    nammua = models.IntegerField(null=True, db_column='NAMMUA')
    dungtich = models.CharField(max_length=50, null=True, db_column='DUNGTICH')
    sokmdadi = models.BigIntegerField(null=True, db_column='SOKMDADI')
    baohanh = models.CharField(max_length=40, null=True, db_column='BAOHANH')
    xuatxu = models.CharField(max_length=30, null=True, db_column='XUATXU')
    tinhtrangxe = models.CharField(max_length=30, null=True, db_column='TINHTRANGXE')
    giaban = models.CharField(max_length=10, null=True, db_column='GIABAN')

    class Meta:
        db_table = 'BAIVIET'
        managed = False



class GoiGiaoDich(models.Model):
    maloaigiaodich = models.CharField(max_length=10, primary_key=True, db_column='MALOAIGIAODICH')
    tenloaigiaodich = models.CharField(max_length=50, db_column='TENLOAIGIAODICH')
    sotien = models.DecimalField(max_digits=19, decimal_places=4, db_column='SOTIEN')
    songay = models.SmallIntegerField(db_column='SONGAY')

    class Meta:
        db_table = 'GOIGIAODICH'
        managed = False


class HinhAnh(models.Model):
    mahinh = models.CharField(max_length=10, primary_key=True, db_column='MAHINHANH')
    mabaiviet = models.ForeignKey(BaiViet, on_delete=models.CASCADE, null=True, blank=True, db_column='MABAIVIET')
    tenfile = models.CharField(max_length=10, null=True, blank=True, db_column='TENFILE')

    class Meta:
        db_table = 'HINHANH'
        managed = False


class Follwer(models.Model):
    followerid = models.ForeignKey(NguoiDung, related_name='following', on_delete=models.CASCADE, db_column='followerid', primary_key=True)
    followingid = models.ForeignKey(NguoiDung, related_name='followers', on_delete=models.CASCADE, db_column='followingid')
    followedat = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('followerid', 'followingid')  # Tạo khóa duy nhất cho hai trường
        db_table = 'Follwer'  # Tên bảng trong SQL Server
        managed = False  # Để Django không tự quản lý bảng này


class NapDayTin(models.Model):
    magd = models.CharField(max_length=10, primary_key=True, db_column='MAGD')
    mabaiviet = models.ForeignKey(BaiViet, on_delete=models.SET_NULL, null=True, blank=True, db_column='MABAIVIET')
    manguoidung = models.ForeignKey(NguoiDung, on_delete=models.SET_NULL, null=True, blank=True, db_column='MANGUOIDUNG')
    ngay = models.DateTimeField(null=True, blank=True, db_column='NGAY')

    class Meta:
        db_table = 'NAPDAYTIN'
        managed = False


class NapGiaHan(models.Model):
    magiaodich = models.CharField(max_length=10, primary_key=True, db_column='MAGIAODICH')
    maloaigiaodich = models.ForeignKey(GoiGiaoDich, on_delete=models.CASCADE, db_column='MALOAIGIAODICH')
    manguoidung = models.ForeignKey(NguoiDung, on_delete=models.CASCADE, db_column='MANGUOIDUNG')
    mabaiviet = models.ForeignKey(BaiViet, on_delete=models.CASCADE, db_column='MABAIVIET')
    sotien = models.DecimalField(max_digits=19, decimal_places=4, null=True, blank=True, db_column='SOTIEN')
    ngaygiaodich = models.DateTimeField(db_column='NGAYGIAODICH')

    class Meta:
        db_table = 'NAPGIAHAN'
        managed = False


class NapTienTaiKhoan(models.Model):
    magiaodich = models.CharField(max_length=50, primary_key=True, db_column='MAGIAODICH')
    manguoidung = models.ForeignKey(NguoiDung, on_delete=models.CASCADE, db_column='MANGUOIDUNG')
    sotiennap = models.DecimalField(max_digits=19, decimal_places=4, null=True, blank=True, db_column='SOTIENNAP')
    thoigiannap = models.DateTimeField(null=True, blank=True, db_column='THOIGIANNAP')

    class Meta:
        db_table = 'NAPTIENTAIKHOAN'
        managed = False



class ThongBao(models.Model):
    mathongbao = models.AutoField(primary_key=True, db_column='MATHONGBAO')  # Đặt mathongbao là AutoField
    manguoidung = models.ForeignKey(NguoiDung, on_delete=models.CASCADE, db_column='MANGUOIDUNG')
    mabaiviet = models.ForeignKey(BaiViet, on_delete=models.SET_NULL, null=True, blank=True, db_column='MABAIVIET')
    tieude = models.CharField(max_length=50, null=True, blank=True, db_column='TIEUDE')
    noidung = models.CharField(max_length=256, null=True, blank=True, db_column='NOIDUNG')
    thoigiangui = models.DateTimeField(null=True, blank=True, db_column='THOIGIANGUI')

    class Meta:
        db_table = 'THONGBAO'
        managed = False  # Nếu bạn đang sử dụng bảng đã có trong cơ sở dữ liệu và không muốn Django quản lý bảng này


class ThuocTinhHeThong(models.Model):
    logo = models.ImageField(upload_to='logos/', null=True, blank=True)
    maugiaodien = models.CharField(max_length=10, null=True, blank=True, db_column='MauGiaoDien')
    diachifooter = models.TextField(null=True, blank=True, db_column='DiaChiFooter')
    thanhvienfooter = models.TextField(null=True, blank=True, db_column='ThanhVienFooter')
    kenhtruyenthongfooter = models.TextField(null=True, blank=True, db_column='KenhTruyenThongFooter')
    phuongthucthanhtoanfooter = models.TextField(null=True, blank=True, db_column='PhuongThucThanhToanFooter')
    id = models.AutoField(primary_key=True)  # Trường ID tự động tăng bắt đầu từ 1
    tranggioithieu = models.TextField(null=True, blank=True, db_column='TrangGioiThieu')
    class Meta:
        db_table = 'THUOCTINHHETHONG'
        managed = False

class Voucher(models.Model):
    MaVoucher = models.AutoField(primary_key=True)  # IDENTITY(1,1) -> AutoField
    code = models.CharField(max_length=20, unique=True)  # char(20), UNIQUE NONCLUSTERED
    Mota = models.TextField(null=True, blank=True)  # nvarchar(max)
    GiaTriGiam = models.FloatField()  # float
    NgayBatDau = models.DateTimeField()  # datetime
    NgayKetThuc = models.DateTimeField()  # datetime
    HoatDong = models.BooleanField(default=True)  # bit with DEFAULT ((1))
    NgayTao = models.DateTimeField(auto_now_add=True)  # datetime with DEFAULT (getdate())

    class Meta:
        db_table = 'Voucher'  # Tên bảng trong SQL Server
        managed = False