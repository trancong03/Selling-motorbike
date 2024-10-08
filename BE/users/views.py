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

@csrf_exempt
def update_user(request, id):
    if request.method == 'PUT':
        try:
            user = NguoiDung.objects.get(iduser=id.strip())  # Loại bỏ khoảng trắng
            data = json.loads(request.body)

            # Cập nhật thông tin người dùng
            user.fullname = data.get('fullname', user.fullname)
            user.email = data.get('email', user.email)
            user.address = data.get('address', user.address)
            user.phone = data.get('phone', user.phone)
            user.gender = data.get('gender', user.gender)
            user.identity_card = data.get('identity_card', user.identity_card)
            user.discription = data.get('discription', user.discription)
            user.birthdate = data.get('birthdate', user.birthdate)

            user.save()  # Lưu thay đổi

            serializer = NguoiDungSerializer(user)
            return JsonResponse(serializer.data, status=200)

        except NguoiDung.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

    return JsonResponse({'error': 'Method not allowed'}, status=405)
