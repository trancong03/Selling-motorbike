import logging
from ..utils.db import execute_query
import logging
from users.models import BaiViet,YeuThich

class PostRepository:
    @staticmethod
    def get_all_bai_viet():
        query = """
        SELECT dbo.LayDanhSachBaiViet()
        """
        try:
            # Execute the query and retrieve results
            query_result = execute_query(query)
            
            # Check if the result is valid
            if query_result and isinstance(query_result, list):
                return query_result
            else:
                return None  # If no valid result found
        
        except Exception as e:
            # Log the error for debugging purposes
            logging.error(f"Error while fetching bai viet: {e}")
            return None
    @staticmethod
    def get_all_bai_viet_by_manguoidung(manguoidung):
        query = """
        SELECT dbo.LayBaiVietTheoID(%s) ;
        """
        try:
            # Execute the query with parameters
            query_result = execute_query(query, [manguoidung])
            
            # In case the query returns no data, return an empty list or appropriate message
            if query_result is None:
                return {"error": "No data found"}
            
            if isinstance(query_result, list) and len(query_result) > 0:
                return query_result
            else:
                return {"error": "Invalid structure or empty result"}
        except Exception as e:
            # Handle exceptions (logging or raising further)
            print(f"Error occurred: {e}")
            return {"error": f"An error occurred: {str(e)}"}

    @staticmethod
    def get_all_bai_viet_like(manguoidung):
        query = """
        select dbo.LayDanhSachBaiVietYeuThich(%s)
        """
        try:
            # Execute the query and retrieve results
            query_result = execute_query(query, [manguoidung])
            
            # Check if the result is valid
            if query_result and isinstance(query_result, list):
                return query_result
            else:
                return None  # If no valid result found
        
        except Exception as e:
            # Log the error for debugging purposes
            logging.error(f"Error while fetching bai viet: {e}")
            return None   
    @staticmethod
    def get_post_by_id(id):
        try:
            return BaiViet.objects.get(mabaiviet=id)
        except BaiViet.DoesNotExist:
            return None
    @staticmethod
    def tao_bai_viet(
        ma_nguoi_dung, ma_gd, tieu_de, thong_tin_lien_lac, mo_ta, dia_chi_bai_viet,
        hang_xe, loai_xe, nam_mua, dung_tich, so_km_da_di, bao_hanh,
        xuat_xu, tinh_trang_xe, gia_ban, danh_sach_hinh
    ):
        # Câu truy vấn với các giá trị trực tiếp thay vì placeholder "?"
        query = f"""
        EXEC dbo.TaoBaiViet 
            '{ma_nguoi_dung}', '{ma_gd}', N'{tieu_de}', '{thong_tin_lien_lac}', N'{mo_ta}', 
            N'{dia_chi_bai_viet}', '{hang_xe}', N'{loai_xe}', '{nam_mua}', '{dung_tich}', 
            '{so_km_da_di}', N'{bao_hanh}', N'{xuat_xu}', N'{tinh_trang_xe}', '{gia_ban}', '{danh_sach_hinh}';
        """

        try:
            # In câu truy vấn ra để kiểm tra
            print(f"Đang thực thi câu truy vấn: {query}")
            # Thực thi câu truy vấn
            result = execute_query(query)
            print("Thủ tục 'TaoBaiViet' đã thực thi thành công.")
            return True
        except Exception as e:
            logging.error(f"Lỗi khi gọi thủ tục 'TaoBaiViet': {e}", exc_info=True)
            return False
    @staticmethod
    def them_yeu_thich(
        ma_nguoi_dung, ma_baiviet
    ):
        # Câu truy vấn với các giá trị trực tiếp thay vì placeholder "?"
        query = f"""
        EXEC dbo.ThemYeuThich  '{ma_nguoi_dung}', '{ma_baiviet}';
        """
        try:
            print(f"Đang thực thi câu truy vấn: {query}")
            result = execute_query(query)
            print("Thủ tục 'ThemYeuThich' đã thực thi thành công.")
            return True
        except Exception as e:
            logging.error(f"Lỗi khi gọi thủ tục 'ThemYeuThich': {e}", exc_info=True)
            return False
    @staticmethod
    def xoa_yeu_thich(
        ma_nguoi_dung, ma_baiviet
    ):
        # Câu truy vấn với các giá trị trực tiếp thay vì placeholder "?"
        query = f"""
        EXEC dbo.HuyYeuThich  '{ma_nguoi_dung}', '{ma_baiviet}';
        """
        try:
            print(f"Đang thực thi câu truy vấn: {query}")
            result = execute_query(query)
            print("Thủ tục 'HuyYeuThich' đã thực thi thành công.")
            return True
        except Exception as e:
            logging.error(f"Lỗi khi gọi thủ tục 'HuyYeuThich': {e}", exc_info=True)
            return False
 
    @staticmethod
    def sua_bai_viet(
       ma_gd, tieu_de, thong_tin_lien_lac, mo_ta, dia_chi_bai_viet,
        hang_xe, loai_xe, nam_mua, dung_tich, so_km_da_di, bao_hanh,
        xuat_xu, tinh_trang_xe, gia_ban, danh_sach_hinh
    ):
        # Câu truy vấn với các giá trị trực tiếp thay vì placeholder "?"
        query = f"""
        EXEC dbo.SuaBaiViet 
             '{ma_gd}', N'{tieu_de}', '{thong_tin_lien_lac}', N'{mo_ta}', 
            N'{dia_chi_bai_viet}', '{hang_xe}', N'{loai_xe}', '{nam_mua}', '{dung_tich}', 
            '{so_km_da_di}', N'{bao_hanh}', N'{xuat_xu}', N'{tinh_trang_xe}', '{gia_ban}', '{danh_sach_hinh}';
        """

        try:
            # In câu truy vấn ra để kiểm tra
            print(f"Đang thực thi câu truy vấn: {query}")
            # Thực thi câu truy vấn
            result = execute_query(query)
            print("Thủ tục 'SuaBaiViet' đã thực thi thành công.")
            return True
        except Exception as e:
            logging.error(f"Lỗi khi gọi thủ tục 'SuaBaiViet': {e}", exc_info=True)
            return False

    @staticmethod
    def xoa_bai_viet(
       ma_gd
    ):
        # Câu truy vấn với các giá trị trực tiếp thay vì placeholder "?"
        query = f"""
        EXEC dbo.XoaBaiViet '{ma_gd}';
        """
        try:
            print(f"Đang thực thi câu truy vấn: {query}")
            result = execute_query(query)
            print("Thủ tục 'XoaBaiViet' đã thực thi thành công.")
            return True
        except Exception as e:
            logging.error(f"Lỗi khi gọi thủ tục 'XoaBaiViet': {e}", exc_info=True)
            return False

    @staticmethod
    def kiem_tra_yeu_thich(ma_nguoi_dung, ma_baiviet):
        return YeuThich.objects.filter(manguoidung=ma_nguoi_dung, mabaiviet=ma_baiviet).exists()
    @staticmethod
    def lay_list_yeu_thich(ma_nguoi_dung):
        try:
            # Sử dụng filter thay vì get để lấy nhiều đối tượng
            yeu_thich_list = YeuThich.objects.filter(manguoidung=ma_nguoi_dung)
            
            # Kiểm tra nếu không có dữ liệu yêu thích
            if not yeu_thich_list:
                return []  # Nếu không có yêu thích, trả về danh sách rỗng
            
            return yeu_thich_list  # Trả về queryset của các đối tượng yêu thích
        except Exception as e:
            # Logging lỗi nếu có bất kỳ sự cố nào xảy ra
            print(f"Lỗi: {str(e)}")
            return []

