from users.models import NguoiDung

class UserRepository:
    @staticmethod
    def get_user_by_id(iduser):
        try:
            return NguoiDung.objects.get(iduser=iduser)
        except NguoiDung.DoesNotExist:
            return None
    @staticmethod
    def get_user_by_email(email):
        try:
            return NguoiDung.objects.get(email=email)
        except NguoiDung.DoesNotExist:
            return None
    @staticmethod
    def login(username, password):
        try:
            return NguoiDung.objects.get(username=username, password=password)
        except NguoiDung.DoesNotExist:
            return None

    @staticmethod
    def update_user_info(user: NguoiDung, data):
        user.fullname = data.get('fullname', user.fullname)
        user.email = data.get('email', user.email)
        user.address = data.get('address', user.address)
        user.phone = data.get('phone', user.phone)
        user.gender = data.get('gender', user.gender)
        user.identity_card = data.get('identity_card', user.identity_card)
        user.discription = data.get('discription', user.discription)
        user.birthdate = data.get('birthdate', user.birthdate)
        user.save()
        return user
    
    @staticmethod
    def reset_password_forgot(user: NguoiDung, new_password):
        user.password = new_password
        user.save()
        return user
    @staticmethod   
    def update_images(user: NguoiDung, avatar_name, background_name):
        if avatar_name:
            user.avatar = avatar_name
        if background_name:
            user.background = background_name
        user.save()
