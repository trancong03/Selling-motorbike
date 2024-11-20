from users.repositories.user_repositorie import UserRepository
from users.models import NguoiDung
from django.core.cache import cache
class UserService:

    @staticmethod
    def get_user_by_id(iduser):
        return UserRepository.get_user_by_id(iduser)

    @staticmethod
    def update_images(user: NguoiDung, avatar_name=None, background_name=None):
        UserRepository.update_images(user, avatar_name, background_name)

    @staticmethod
    def set_password(user: NguoiDung, newpassword=None):
        if newpassword:
            user.password = newpassword
        user.save()

    @staticmethod
    def login(username, password):
        return UserRepository.login(username, password)

    @staticmethod
    def update_user_info(user: NguoiDung, data):
        return UserRepository.update_user_info(user, data)

    @staticmethod
    def reset_password(user: NguoiDung, new_password):
       return UserRepository.reset_password_forgot(user, new_password)
    @staticmethod
    def reset_password_forgot(email, new_password):
       user:NguoiDung = UserRepository.get_user_by_email(email)
       return UserRepository.reset_password_forgot(user, new_password)
   
    
    @staticmethod
    def update_user_info(user: NguoiDung, data):
        return UserRepository.update_user_info(user,data)
    
    @staticmethod
    def update_images(user: NguoiDung, avatar_name, background_name):
        return UserRepository.update_images(user,avatar_name,background_name)
    @staticmethod
    def get_user_by_email(email):
        """Lấy người dùng theo email."""
        return NguoiDung.objects.filter(email=email).first()  

    @staticmethod
    def save_otp(email, otp):
        """Lưu OTP vào cache với thời gian hết hạn."""
        cache.set(f'otp_{email}', otp, timeout=300)  # Lưu OTP và tự động xóa sau 5 phút
        print(f'Giá trị OTP trong cache: { cache.get(f'otp_{email}')}')
    @staticmethod
    def check_otp(email, otp):
        """Kiểm tra OTP đã lưu."""
        otp = otp.strip()
        cached_otp = cache.get(f'otp_{email}')
        cached_otp = str(cached_otp)
        print(f'Giá trị OTP trong cache kiểm tra: {cached_otp} và OTP nhập vào: {otp}')
        result = cached_otp.strip() == otp
        print(f'Kết quả kiểm tra OTP: {result}')  # Thêm dòng này để in kết quả
        return result