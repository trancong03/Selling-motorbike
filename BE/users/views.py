import pyodbc
import json 
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

def get_connection():
    conn = pyodbc.connect(
        'DRIVER={ODBC Driver 17 for SQL Server};'
        'SERVER=localhost;'
        'DATABASE=test;'
        'UID=sa;'
        'PWD=123;'
    )
    return conn

@csrf_exempt
def get_all_users(request):
    if request.method == 'GET':
        conn = get_connection()
        cursor = conn.cursor()

        # Truy vấn tất cả user từ bảng users
        query = """
        SELECT full_name, age
        FROM users
        """
        cursor.execute(query)
        results = cursor.fetchall()

        # Chuyển đổi kết quả thành danh sách các dict
        users = [{'full_name': row[0], 'age': row[1]} for row in results]

        return JsonResponse({'users': users}, safe=False)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        conn = get_connection()
        cursor = conn.cursor()

        query = """
        SELECT full_name, age 
        FROM users 
        WHERE username=? AND password=?
        """
        cursor.execute(query, (username, password))
        result = cursor.fetchone()

        if result:
            full_name, age = result
            return JsonResponse({'full_name': full_name, 'age': age})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
    
    # Nếu không phải là POST, trả về lỗi 405 Method Not Allowed
    return JsonResponse({'error': 'Method not allowed'}, status=405)
