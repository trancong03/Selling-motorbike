import json
import random
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .services.user_service import UserService
from .serializers import NguoiDungSerializer
from django.core.mail import send_mail
from django.conf import settings
@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = UserService.login(username, password)
        if user:
            serializer = NguoiDungSerializer(user)
            return JsonResponse({'user': serializer.data}, status=200)
        return JsonResponse({'error': 'Invalid credentials'}, status=401)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
@require_http_methods(['PUT'])
def update_user(request, id):
    user = UserService.get_user_by_id(id.strip())
    if not user:
        return JsonResponse({'error': 'User not found'}, status=404)
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    user = UserService.update_user_info(user, data)
    serializer = NguoiDungSerializer(user)
    return JsonResponse(serializer.data, status=200)

@csrf_exempt
@require_http_methods(['POST'])
def update_user_images(request):
    iduser = request.POST.get('iduser')
    avatar_name = request.POST.get('avatar')
    background_name = request.POST.get('background')
    
    
    user = UserService.get_user_by_id(iduser)
    if not user:
        return JsonResponse({'error': 'User not found'}, status=404)
    UserService.update_images(user, avatar_name=avatar_name, background_name=background_name)
    return JsonResponse({'success': True}, status=200)

@csrf_exempt
def reset_password(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data.get('user_id')
        new_password = data.get('new_password')
        print(f"userid: `{user_id}` ")
        user = UserService.get_user_by_id(user_id)
        if not user:
            return JsonResponse({'error': 'User not found'}, status=404)
        UserService.reset_password(user, new_password)
        return JsonResponse({'success': True, 'message': 'Mật khẩu đã được thay đổi thành công.'})
    return JsonResponse({'error': 'Method not allowed'}, status=405)
@csrf_exempt
def reset_password_forgot(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        new_password = data.get('newPassword')
        UserService.reset_password_forgot(email, new_password)
        return JsonResponse({'success': True, 'message': 'Mật khẩu đã được thay đổi thành công.'})
    return JsonResponse({'error': 'Method not allowed'}, status=405)
@csrf_exempt
def forgot_password(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        user = UserService.get_user_by_email(email)
        if not user:
            return JsonResponse({'error': 'Email không hợp lệ'}, status=404)

        otp = random.randint(100000, 999999)  # OTP 6 chữ số
        UserService.save_otp(email, otp)
        subject = 'Mã OTP xác thực'
        message = f'Mã OTP của bạn là: {otp}\n\nVui lòng nhập mã này để xác thực.'
        from_email = settings.DEFAULT_FROM_EMAIL

        try:
            send_mail(subject, message, from_email, [email])
            return JsonResponse({'success': True, 'message': 'Mã OTP đã được gửi đến email của bạn.'}, status=200)
        except Exception as e:
            return JsonResponse({'error': f'Có lỗi xảy ra khi gửi OTP: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Phương thức không hợp lệ'}, status=405)
@csrf_exempt
def verify_otp(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        otp = data.get('otp')
        
        if UserService.check_otp(email,otp):
            return JsonResponse({'message': 'OTP hợp lệ.'}, status=200)
        return JsonResponse({'error': 'OTP không hợp lệ.'}, status=400)
    return JsonResponse({'error': 'Method not allowed'}, status=405)
