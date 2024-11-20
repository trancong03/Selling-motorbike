import json
import random
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from datetime import datetime
from ..models import NguoiDung
from ..services.user_service import UserService
from ..serializers import NguoiDungSerializer
from django.core.mail import send_mail
from django.conf import settings
import jwt
from datetime import datetime, timedelta, timezone
import jwt
from datetime import datetime, timedelta, timezone
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.hashers import make_password   
from django.contrib.auth.hashers import check_password
def create_jwt(user):
    """
    Tạo JWT cho người dùng sau khi đăng nhập thành công.
    """
    # Sử dụng thời gian UTC hiện tại cho cả 'iat' và 'exp'
    now = datetime.now(timezone.utc)
    exp_time = now + timedelta(days=1)  # Token hết hạn sau 1 ngày
    
    payload = {
        'sub': user.manguoidung,               # User ID
        'name': user.tendangnhap,              # Tên người dùng
        'iat': now,                            # Thời gian tạo token
        'exp': exp_time                        # Thời gian hết hạn token
    }

    # Tạo JWT sử dụng secret key từ settings.py
    token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm="HS256")
    return token
def convert_timestamp_to_datetime(timestamp):
    return datetime.utcfromtimestamp(timestamp)

def authenticate_token(request):
    token = request.headers.get('Authorization')
    if not token:
        raise AuthenticationFailed("Authorization token is missing")
    
    # Lấy token từ prefix Bearer
    if token.startswith('Bearer '):
        token = token[7:]
    else:
        raise AuthenticationFailed("Authorization token is not in correct format")

    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get('sub')
        if not user_id:
            raise AuthenticationFailed("User ID is missing from token")
        try:
            user = NguoiDung.objects.get(manguoidung=user_id)
        except NguoiDung.DoesNotExist:
            raise AuthenticationFailed("User not found")
        return user
    
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("Token has expired")
    except jwt.InvalidTokenError as e:
        raise AuthenticationFailed(f"Invalid token: {e}")
    except Exception as e:
        raise AuthenticationFailed(f"Authentication failed: {e}")

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        try:
            user = NguoiDung.objects.get(tendangnhap=username)  # Truy vấn người dùng qua username
        except NguoiDung.DoesNotExist:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
        if check_password(password.strip(), user.matkhau.strip()):  # So sánh mật khẩu đã nhập với mật khẩu đã mã hóa trong cơ sở dữ liệu
            print("Mật khẩu đúng!")
            token = create_jwt(user)  # Tạo token JWT nếu cần thiết
            serializer = NguoiDungSerializer(user)
            return JsonResponse({
                'user': serializer.data,
                'token': token  # Trả token trong response
            }, status=200)

        return JsonResponse({'error': 'Invalid credentials'}, status=401)

    return JsonResponse({'error': 'Method not allowed'}, status=405)
@csrf_exempt
@require_http_methods(['GET'])
def get_user(request, iduser):
    user = UserService.get_user_by_id(iduser)
    if user:
        serializer = NguoiDungSerializer(user) 
        return JsonResponse({'user': serializer.data}, status=200)
    else:
        return JsonResponse({'error': 'User not found'}, status=404)

@csrf_exempt
@require_http_methods(['PUT'])
def update_user(request, id):
    user = UserService.get_user_by_id(id)
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
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            full_name = data.get('fullname')
            email = data.get('email')
            if not username or not password or not email or not full_name:
                return JsonResponse({'error': 'Tất cả các trường là bắt buộc'}, status=400)
            # Kiểm tra xem tên người dùng hoặc email đã tồn tại chưa
            if NguoiDung.objects.filter(tendangnhap=username).exists():
                return JsonResponse({'error': 'Tên người dùng đã tồn tại'}, status=400)
            if NguoiDung.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email đã được sử dụng'}, status=400)
            # Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
            hashed_password = make_password(password)
            # Tạo người dùng mới
            new_user = NguoiDung.objects.create(
                tendangnhap=username,
                matkhau=hashed_password,
                email=email,
                hoten=full_name
            )
            new_user.save()
            return JsonResponse({'message': 'Đăng ký thành công'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Phương thức không hợp lệ'}, status=405)

@csrf_exempt
@require_http_methods(['POST'])
def update_user_images(request):
    iduser = request.POST.get('iduser')
    avatar_name = request.POST.get('avatar')
    background_name = request.POST.get('background')
    
    
    user = UserService.get_user_by_id(iduser)
    if not user:
        return JsonResponse({'error': 'User not found'}, status=404)
    print(avatar_name, background_name)
    
    UserService.update_images(user, avatar_name=avatar_name, background_name=background_name)
    return JsonResponse({'success': True}, status=200)

@csrf_exempt
def reset_password(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data.get('user_id')
        new_password = data.get('new_password')
        hashed_password = make_password(new_password)
        user = UserService.get_user_by_id(user_id)
        if not user:
            return JsonResponse({'error': 'User not found'}, status=404)
        UserService.reset_password(user, hashed_password)
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
