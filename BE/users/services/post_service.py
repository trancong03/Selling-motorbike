from users.repositories.post_repository import PostRepository
from django.forms.models import model_to_dict
class PostService:
    @staticmethod
    def get_all_bai_viet():
        return PostRepository.get_all_bai_viet()
    @staticmethod
    def tao_bai_viet(
        ma_nguoi_dung, ma_gd, tieu_de, thong_tin_lien_lac, mo_ta, dia_chi_bai_viet,
        hang_xe, loai_xe, nam_mua, dung_tich, so_km_da_di, bao_hanh,
        xuat_xu, tinh_trang_xe, gia_ban, danh_sach_hinh
    ):
        return PostRepository.tao_bai_viet(ma_nguoi_dung, ma_gd, tieu_de, thong_tin_lien_lac, mo_ta, dia_chi_bai_viet,
        hang_xe, loai_xe, nam_mua, dung_tich, so_km_da_di, bao_hanh,
        xuat_xu, tinh_trang_xe, gia_ban, danh_sach_hinh)
    @staticmethod
    def sua_bai_viet(
        ma_gd, tieu_de, thong_tin_lien_lac, mo_ta, dia_chi_bai_viet,
        hang_xe, loai_xe, nam_mua, dung_tich, so_km_da_di, bao_hanh,
        xuat_xu, tinh_trang_xe, gia_ban, danh_sach_hinh
    ):
        
        return PostRepository.sua_bai_viet(ma_gd, tieu_de, thong_tin_lien_lac, mo_ta, dia_chi_bai_viet,
        hang_xe, loai_xe, nam_mua, dung_tich, so_km_da_di, bao_hanh,
        xuat_xu, tinh_trang_xe, gia_ban, danh_sach_hinh)
    @staticmethod
    def get_all_bai_viet_like(manguoidung):
        return PostRepository.get_all_bai_viet_like(manguoidung)
    @staticmethod
    def get_all_bai_viet_by_manguoidung(manguoidung):
        return PostRepository.get_all_bai_viet_by_manguoidung(manguoidung)
    @staticmethod
    def get_post_by_id(id):
        return PostRepository.get_post_by_id(id)
    @staticmethod
    def xoa_bai_viet(ma_gd):
        return PostRepository.xoa_bai_viet(ma_gd)
    @staticmethod
    def them_yeu_thich( ma_nguoi_dung, ma_baiviet ):
        return PostRepository.them_yeu_thich(ma_nguoi_dung, ma_baiviet)
    @staticmethod
    def xoa_yeu_thich( ma_nguoi_dung, ma_baiviet ):
        return PostRepository.xoa_yeu_thich(ma_nguoi_dung, ma_baiviet)
    @staticmethod
    def kiem_tra_yeu_thich(ma_nguoi_dung, ma_baiviet):
        return PostRepository.kiem_tra_yeu_thich(ma_nguoi_dung, ma_baiviet)
    @staticmethod
    def lay_list_yeu_thich(ma_nguoi_dung):  
        try:
            yeu_thich_list = PostRepository.lay_list_yeu_thich(ma_nguoi_dung)
            return [model_to_dict(item, fields=['mabaiviet']) for item in yeu_thich_list]
        except Exception as e:
            return []