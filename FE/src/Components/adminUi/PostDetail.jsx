import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Sử dụng useParams
import '../Style/PostDetail.css';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams(); // Lấy id từ URL

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/admin-api/baiviet/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };
    fetchPostDetail();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-detail">
      <h1>Chi Tiết Bài Viết</h1>
      <div className="post-info">
        <h2>{post.tieude}</h2>
        <p><strong>Mã bài viết:</strong> {post.mabaiviet}</p>
        <p><strong>Nội dung:</strong> {post.mota}</p>
        <p><strong>Mô tả:</strong> {post.mota}</p>
        <p><strong>Địa chỉ bài viết:</strong> {post.diachibaiviet}</p>
        <p><strong>Giá trị:</strong> {post.giatri} VND</p>
        <p><strong>Thông tin liên lạc:</strong> {post.thongtinlienlac}</p>
        <p><strong>Ngày đăng:</strong> {new Date(post.ngaydang).toLocaleDateString()}</p>
        <p><strong>Ngày hết hạn:</strong> {new Date(post.ngayhethan).toLocaleDateString()}</p>
        <p><strong>Mã xe:</strong> {post.maxe}</p>
        <p><strong>Mã người dùng:</strong> {post.manguoidung || 'Không có'}</p>
      </div>
    </div>
  );
};

export default PostDetail;
