import logging
from ..utils.db import execute_query
import logging


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
