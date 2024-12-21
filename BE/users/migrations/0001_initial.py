# Generated by Django 5.0.10 on 2024-12-19 01:23

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BaiViet',
            fields=[
                ('mabaiviet', models.AutoField(primary_key=True, serialize=False)),
                ('manguoidung', models.IntegerField(blank=True, null=True)),
                ('magd', models.CharField(blank=True, max_length=10, null=True)),
                ('tieude', models.CharField(blank=True, max_length=75, null=True)),
                ('noidung', models.TextField(blank=True, null=True)),
                ('thongtinlienlac', models.CharField(blank=True, max_length=200, null=True)),
                ('mota', models.TextField(blank=True, null=True)),
                ('diachibaiviet', models.CharField(blank=True, max_length=200, null=True)),
                ('giatri', models.DecimalField(blank=True, decimal_places=4, max_digits=19, null=True)),
                ('ngaydang', models.DateField(blank=True, null=True)),
                ('ngayhethan', models.DateField(blank=True, null=True)),
                ('hangxe', models.CharField(blank=True, max_length=15, null=True)),
                ('loaixe', models.CharField(blank=True, max_length=25, null=True)),
                ('nammua', models.IntegerField(blank=True, null=True)),
                ('dungtich', models.CharField(blank=True, max_length=50, null=True)),
                ('sokmdadi', models.BigIntegerField(blank=True, null=True)),
                ('baohanh', models.CharField(blank=True, max_length=40, null=True)),
                ('xuatxu', models.CharField(blank=True, max_length=30, null=True)),
                ('tinhtrangxe', models.CharField(blank=True, max_length=30, null=True)),
                ('giaban', models.CharField(blank=True, max_length=10, null=True)),
                ('status', models.IntegerField()),
            ],
            options={
                'db_table': 'BAIVIET',
            },
        ),
        migrations.CreateModel(
            name='GOIGIAODICH',
            fields=[
                ('MALOAIGIAODICH', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('TENLOAIGIAODICH', models.IntegerField()),
                ('SOTIEN', models.CharField(max_length=255)),
                ('SONGAY', models.IntegerField(max_length=255)),
            ],
            options={
                'db_table': 'GOIGIAODICH',
            },
        ),
        migrations.CreateModel(
            name='HinhAnh',
            fields=[
                ('mahinhanh', models.AutoField(primary_key=True, serialize=False)),
                ('mabaiviet', models.IntegerField()),
                ('tenfile', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'HINHANH',
            },
        ),
        migrations.CreateModel(
            name='LocalImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='NAPDAYTIN',
            fields=[
                ('MAGD', models.AutoField(primary_key=True, serialize=False)),
                ('MANGUOIDUNG', models.IntegerField()),
                ('MABAIVIET', models.IntegerField()),
                ('NGAY', models.DateTimeField(max_length=255)),
            ],
            options={
                'db_table': 'NAPDAYTIN',
            },
        ),
        migrations.CreateModel(
            name='NAPGIAHAN',
            fields=[
                ('MAGIAODICH', models.AutoField(primary_key=True, serialize=False)),
                ('MALOAIGIAODICH', models.CharField(max_length=255)),
                ('MANGUOIDUNG', models.IntegerField()),
                ('MABAIVIET', models.IntegerField()),
                ('SOTIEN', models.CharField(max_length=255)),
                ('NGAYGIAODICH', models.DateField(max_length=255)),
            ],
            options={
                'db_table': 'NAPGIAHAN',
            },
        ),
        migrations.CreateModel(
            name='NguoiDung',
            fields=[
                ('manguoidung', models.AutoField(primary_key=True, serialize=False)),
                ('tendangnhap', models.CharField(blank=True, max_length=20, null=True)),
                ('matkhau', models.CharField(blank=True, max_length=50, null=True)),
                ('hoten', models.CharField(blank=True, max_length=50, null=True)),
                ('ngaysinh', models.DateField(blank=True, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('diachi', models.CharField(blank=True, max_length=255, null=True)),
                ('sodienthoai', models.CharField(blank=True, max_length=12, null=True)),
                ('gioitinh', models.CharField(blank=True, max_length=4, null=True)),
                ('socccd', models.CharField(blank=True, max_length=12, null=True)),
                ('mota', models.CharField(blank=True, max_length=255, null=True)),
                ('anhdaidien', models.CharField(blank=True, max_length=50, null=True)),
                ('anhnen', models.CharField(blank=True, max_length=10, null=True)),
                ('is_superuser', models.BooleanField(default=False)),
                ('sodu', models.DecimalField(blank=True, decimal_places=4, max_digits=19, null=True)),
            ],
            options={
                'db_table': 'NGUOIDUNG',
            },
        ),
        migrations.CreateModel(
            name='Xe',
            fields=[
                ('maxe', models.AutoField(primary_key=True, serialize=False)),
                ('tenxe', models.CharField(blank=True, max_length=50, null=True)),
                ('loaixe', models.CharField(blank=True, max_length=25, null=True)),
                ('hangxe', models.CharField(blank=True, max_length=15, null=True)),
                ('biensoxe', models.CharField(blank=True, max_length=10, null=True)),
                ('nammua', models.DateTimeField(blank=True, null=True)),
                ('dungtich', models.CharField(blank=True, max_length=5, null=True)),
                ('sokmdadi', models.BigIntegerField(blank=True, null=True)),
                ('mausac', models.CharField(blank=True, max_length=15, null=True)),
                ('thongso', models.CharField(blank=True, max_length=200, null=True)),
                ('tinhtrangxe', models.CharField(blank=True, max_length=15, null=True)),
                ('giaban', models.CharField(blank=True, max_length=10, null=True)),
            ],
            options={
                'db_table': 'XE',
            },
        ),
        migrations.CreateModel(
            name='YeuThich',
            fields=[
                ('mayt', models.AutoField(primary_key=True, serialize=False)),
                ('manguoidung', models.IntegerField(db_column='MANGUOIDUNG')),
                ('mabaiviet', models.IntegerField(db_column='MABAIVIET')),
            ],
            options={
                'db_table': 'YEUTHICH',
            },
        ),
        migrations.CreateModel(
            name='Follower',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('followed_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='following', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followers', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]