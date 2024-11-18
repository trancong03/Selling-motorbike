import React, { useEffect, useState } from "react";
import axios from "axios";

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  // Fetch notifications, users, and posts from the API
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/thongbao/")
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error("Có lỗi xảy ra khi lấy dữ liệu thông báo:", error);
      });

    axios.get("http://127.0.0.1:8000/api/nguoidung/")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Có lỗi xảy ra khi lấy dữ liệu người dùng:", error);
      });

    axios.get("http://127.0.0.1:8000/api/baiviet/")
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error("Có lỗi xảy ra khi lấy dữ liệu bài viết:", error);
      });
  }, []);

  // Find user full name by userId
  const findUserName = (userId) => {
    const user = users.find(u => u.iduser.trim() === userId.trim());
    return user ? user.fullname : "Không rõ";
  };

  // Find post title by postId
  const findPostTitle = (postId) => {
    const post = posts.find(p => p.mabaiviet.trim() === postId.trim());
    return post ? post.tieude : "Không rõ";
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Quản lý thông báo</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người dùng</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bài đăng</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nội dung</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {notifications.map((notification, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">{findUserName(notification.manguoidung)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{findPostTitle(notification.mabaiviet)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{notification.tieude || "Không có tiêu đề"}</td>
              <td className="px-6 py-4 whitespace-nowrap">{notification.noidung}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(notification.thoigiangui).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationManagement;
