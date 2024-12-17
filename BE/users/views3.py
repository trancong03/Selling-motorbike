from rest_framework import serializers, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Follower,NguoiDung

# Serializer cho Follower
class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follower
        fields = ['id', 'user', 'follower', 'created_at']

# ViewSet cho Follower
class FollowerViewSet(viewsets.ModelViewSet):
    queryset = Follower.objects.all()
    serializer_class = FollowerSerializer

    # Tìm kiếm những người mà người dùng theo dõi
    def get_queryset(self):
        user = self.request.user
        return Follower.objects.filter(follower=user)
    
    # Tạo mối quan hệ người theo dõi
    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(follower=user)
        
# Endpoint để tạo mối quan hệ theo dõi giữa người dùng
def follow_user(request, user_id):
    try:
        user_to_follow = NguoiDung.objects.get(manguoidung=user_id)
    except NguoiDung.DoesNotExist:
        return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Kiểm tra nếu người dùng đã theo dõi
    if Follower.objects.filter(user=user_to_follow, follower=request.user).exists():
        return Response({"detail": "You are already following this user"}, status=status.HTTP_400_BAD_REQUEST)

    Follower.objects.create(user=user_to_follow, follower=request.user)
    return Response({"detail": f"You are now following {user_to_follow.username}"}, status=status.HTTP_201_CREATED)
