import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import NguoiDung
from .serializers import NguoiDungSerializer

@csrf_exempt
def get_all_users(request):
    if request.method == 'GET':
        users = NguoiDung.objects.all()  # Sử dụng model để lấy tất cả người dùng
        serializer = NguoiDungSerializer(users, many=True)  # Serialize danh sách người dùng
        return JsonResponse({'users': serializer.data}, safe=False)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        try:
            user = NguoiDung.objects.get(username=username, password=password)  # Tìm người dùng
            serializer = NguoiDungSerializer(user)  # Serialize thông tin người dùng
            return JsonResponse({'user': serializer.data}, status=200)
        except NguoiDung.DoesNotExist:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)

    return JsonResponse({'error': 'Method not allowed'}, status=405)
