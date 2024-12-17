# from django.db import models
# from django.contrib.auth.models import User  # Giả sử bạn đang sử dụng mô hình User mặc định của Django

# class Follower(models.Model):
#     user = models.ForeignKey(User, related_name='followed_by', on_delete=models.CASCADE)
#     follower = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f'{self.follower.username} follows {self.user.username}'
