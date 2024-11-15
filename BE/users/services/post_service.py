from users.repositories.post_repository import PostRepository
class PostService:
    @staticmethod
    def get_all_bai_viet():
        return PostRepository.get_all_bai_viet()