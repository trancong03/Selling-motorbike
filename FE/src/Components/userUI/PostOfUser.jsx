import React, { useState, useEffect } from 'react';
import PostItemUser from '../ui/PostItemUser';
import { EllipsisVertical } from 'lucide-react';

export default function PostOfUser({ userId }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   

    useEffect(() => {
        if (!userId.manguoidung) {
            console.error("userId is undefined or invalid");
            return;
        }
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/post/${userId.manguoidung}/`);
                if (!response.ok) {
                    throw new Error('Không thể tải bài viết');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [userId]);

    

  
    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>Đã xảy ra lỗi: {error}</div>;
    }

    return (
        <div>
            {posts.length === 0 ? (
                <p>Không có bài viết nào.</p>
            ) : (
                <div className="max-h-screen overflow-y-auto scrollbar-hidden">
                    <ul>
                        {posts.map((post) => (
                            <div className="w-[90%] p-4 bg-slate-50 mb-3" key={post.MABAIVIET}>
                                <PostItemUser
                                    key={post.MABAIVIET}
                                    product={post}
                                />
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
