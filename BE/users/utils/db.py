from django.db import connection

def execute_query(query, params=None):
    """
    Hàm này thực thi một truy vấn SQL tùy chỉnh và trả về kết quả.
    :param query: Truy vấn SQL cần thực thi.
    :param params: Tham số truy vấn (nếu có), phải là tuple hoặc list.
    :return: Kết quả của truy vấn dưới dạng danh sách các từ điển hoặc None nếu không có kết quả.
    """
    if params is None:
        params = []

    # Thực thi truy vấn với tham số là tuple hoặc list
    with connection.cursor() as cursor:
        cursor.execute(query, params)
        
        # Kiểm tra nếu truy vấn trả về kết quả
        if cursor.description:
            columns = [col[0] for col in cursor.description]  # Lấy tên cột
            results = cursor.fetchall()
            # Chuyển kết quả thành dạng danh sách từ điển
            return [dict(zip(columns, row)) for row in results]
        else:
            # Nếu không có kết quả (truy vấn không trả về dữ liệu), trả về None
            return None
