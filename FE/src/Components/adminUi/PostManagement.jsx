import React, { useState, useEffect } from 'react';

const PostManagement = () => {
  // Khởi tạo state để lưu danh sách bài viết
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // State để theo dõi quá trình tải dữ liệu
  const [error, setError] = useState(null); // State để lưu lỗi nếu có
  const [selectedPost, setSelectedPost] = useState(null); // State cho bài viết được chọn để hiển thị chi tiết
  const [notificationContent, setNotificationContent] = useState(''); // Nội dung thông báo

  // useEffect để gọi admin-api và lấy dữ liệu bài viết
  useEffect(() => {
    fetch('http://127.0.0.1:8000/admin-api/baiviet/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  // Hàm xử lý khi bấm vào một bài viết để hiển thị chi tiết
  const handleViewDetails = (post) => {
    setSelectedPost(post);
  };

  // Hàm xử lý khi đóng popup chi tiết bài viết
  const handleCloseDetails = () => {
    setSelectedPost(null);
  };

  // Hàm gửi thông báo
  const handleSendNotification = (userId, postId) => {
    const notification = {
      bai_viet_id: postId,          // Sử dụng mabaiviet làm bai_viet_id
      title: 'Thông báo về bài viết',  // Tiêu đề thông báo
      message: notificationContent,  // Nội dung thông báo từ state
      user_id: userId,              // Mã người dùng (người nhận thông báo)
    };
    console.log(notification);
    
    fetch('http://localhost:8000/admin-api/gui-thong-bao/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notification),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to send notification');
        }
        alert('Thông báo đã được gửi thành công!');
        setNotificationContent(''); // Reset nội dung thông báo
      })
      .catch((error) => {
        console.error('Error sending notification:', error);
        alert('Gửi thông báo không thành công');
      });
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Error loading posts: {error.message}</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Quản lý bài viết</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã bài viết</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đăng</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {posts.length > 0 ? (
            posts.map((post) => (
              <tr key={post.mabaiviet} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{post.mabaiviet}</td>
                <td className="px-6 py-4 whitespace-nowrap">{post.tieude || 'Không có tiêu đề'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(post.ngaydang).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    onClick={() => handleViewDetails(post)}
                  >
                    Xem chi tiết
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => console.log('Gỡ bài viết:', post.mabaiviet)}
                  >
                    Gỡ
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center">
                Không có bài viết nào
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Popup hiển thị chi tiết bài viết */}
      {selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/2 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Chi tiết bài viết</h3>
            <p><strong>Mã bài viết:</strong> {selectedPost.mabaiviet}</p>
            <p><strong>Tiêu đề:</strong> {selectedPost.tieude || 'Không có tiêu đề'}</p>
            <div className="max-h-[50vh] overflow-y-auto border border-gray-300 p-2 rounded">
              <strong>Nội dung:</strong>
              <div 
                className="content" 
                dangerouslySetInnerHTML={{ __html: selectedPost.mota }} 
              />
            </div>
            <p><strong>Ngày đăng:</strong> {new Date(selectedPost.ngaydang).toLocaleDateString()}</p>
            <div className="mt-4">
              <textarea
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Nhập nội dung thông báo..."
                value={notificationContent}
                onChange={(e) => setNotificationContent(e.target.value)}
              />
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleSendNotification(selectedPost.manguoidung, selectedPost.mabaiviet)}
              >
                Gửi thông báo
              </button>
            </div>
            <button
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={handleCloseDetails}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostManagement;
