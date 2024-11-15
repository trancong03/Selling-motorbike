from django.db import connection

def execute_query(query, params=None):
    """
    Hàm này thực thi một truy vấn SQL tùy chỉnh và trả về kết quả.
    
    :param query: Truy vấn SQL cần thực thi.
    :param params: Tham số truy vấn (nếu có).
    :return: Kết quả của truy vấn dưới dạng danh sách các từ điển.
    """
    if params is None:
        params = []
    
    with connection.cursor() as cursor:
        cursor.execute(query, params)
        # Lấy kết quả dưới dạng danh sách các từ điển
        columns = [col[0] for col in cursor.description]  # Lấy tên cột
        results = cursor.fetchall()
        # Chuyển kết quả thành dạng danh sách từ điển
        return [dict(zip(columns, row)) for row in results]
