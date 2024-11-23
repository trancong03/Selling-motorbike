import React, { useState, useEffect } from 'react';
import PostItemUser from '../ui/PostItemUser';
import NoPosts from './NoPosts';

export default function PostOfUser({ userId }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId || !userId.manguoidung) {
            setLoading(false);
            return;
        }

        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/post/${userId.manguoidung}/`);

                // Kiểm tra nếu phản hồi từ API thành công
                if (!response.ok) {
                    throw new Error(`API request failed with status: ${response.status}`);
                }

                const data = await response.json();

                // Kiểm tra nếu dữ liệu không rỗng
                if (Array.isArray(data) && data.length > 0) {
                    setPosts(data);
                } else {
                    setPosts([]);  // Nếu không có bài viết, set posts là mảng rỗng
                }
            } catch (error) {
                setError(error.message);  // Cập nhật lỗi khi có lỗi
            } finally {
                setLoading(false);  // Đảm bảo set loading là false khi hoàn thành
            }
        };

        fetchPosts();
    }, [userId]);
    if (loading) {
        return <div>Đang tải...</div>;
    }
    const handleCreatePost = () => {
        window.location.href = '/new-post';
    };
    return (
        <div>
            {posts.length === 0 ? (
                <NoPosts onCreatePost={handleCreatePost} />
            ) : (
                <div className="max-h-screen overflow-y-auto scrollbar-hidden">
                    <ul>
                        {posts.map((post) => (
                            <div className="w-[90%] p-4 bg-slate-50 mb-3" key={post.MABAIVIET}>
                                <PostItemUser
                                    key={post.MABAIVIET}
                                    product={post}
                                    userId={userId}
                                />
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
