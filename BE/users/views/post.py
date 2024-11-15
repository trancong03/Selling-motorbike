import json
from django.http import JsonResponse
from ..utils.db import execute_query
def get_all_bai_viet(request):
    # Câu truy vấn SQL sử dụng FOR JSON AUTO
    query = """
    SELECT 
    BAIVIET.*,
    (SELECT  HINHANH.*  FROM  HINHANH   WHERE   HINHANH.MABAIVIET = BAIVIET.MABAIVIET  FOR JSON PATH) AS HINHANH  ,
    NGUOIDUNG.*
    FROM 
        BAIVIET
    JOIN 
        NGUOIDUNG ON BAIVIET.MANGUOIDUNG = NGUOIDUNG.MANGUOIDUNG
    FOR JSON AUTO;

    """
    
    # Thực thi câu truy vấn và lấy kết quả
    query_result = execute_query(query)
    
    # In kết quả để kiểm tra cấu trúc
    print(query_result)

    # Kiểm tra nếu query_result không phải là danh sách trống
    if query_result and isinstance(query_result, list):
        # Lấy khóa động đầu tiên từ kết quả
        if query_result[0]:
            # Giải nén dữ liệu JSON từ đối tượng trả về
            dynamic_key = list(query_result[0].keys())[0]  # Lấy khóa đầu tiên trong kết quả JSON
            json_data_str = query_result[0].get(dynamic_key, '')
            
            if json_data_str:
                # Giải nén chuỗi JSON và trả về dữ liệu
                cleaned_data = json.loads(json_data_str)
                return JsonResponse(cleaned_data, safe=False)
    
    # Trả về phản hồi lỗi nếu không có dữ liệu hoặc cấu trúc không đúng
    return JsonResponse({"error": "No data found or invalid structure"}, status=404)
