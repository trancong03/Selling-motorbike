




import React, { useState, useEffect } from "react";
import { FaUsers, FaChartLine, FaNewspaper, FaExchangeAlt, FaFilter, FaBell, FaHeadset, FaCog, FaLock, FaSignOutAlt } from "react-icons/fa";
import UserManagement from "./UserManagement";
import PostManagement from "./PostManagement";
import NotificationManagement from "./NotificationManagement";
import RevenueReport from "./RevenueReport";
import RevenueChart from "./RevenueChart";
import TransactionManagement from "./TransactionManagement";
import SystemSettings from "./SystemSettings.jsx";
import { Navigate } from "react-router-dom";
import "../../Style/admin.css";

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("users");
  const [selectedUser, setSelectedUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin');
    if (!isAuthenticated) {
      window.location.href = '/Admin-Login';
    }
  }, []);

  const sidebarItems = [
    { icon: FaUsers, text: "Tài khoản", view: "users" },
    { icon: FaNewspaper, text: "Bài viết", view: "posts" },
    { icon: FaExchangeAlt, text: "Giao dịch", view: "transactions" },
    { icon: FaFilter, text: "Danh mục", view: "categories" },
    { icon: FaBell, text: "Thông báo", view: "notifications" },
    { icon: FaChartLine, text: "Thống kê doanh thu", view: "revenue" },
    { icon: FaHeadset, text: "Hỗ trợ & Feedback", view: "support" },
    { icon: FaCog, text: "Cài đặt hệ thống", view: "settings" },
    { icon: FaLock, text: "Bảo mật", view: "security" },
    { icon: FaSignOutAlt, text: "Đăng xuất", view: "logout" }
  ];

  const handleSendNotification = (user, post, title, content) => {
    const newNotification = { user, post, title, content, date: new Date() };
    setNotifications([...notifications, newNotification]);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    window.location.href = '/Admin-Login';
  };

  const renderView = () => {
    switch (activeView) {
      case "users":
        return <div className="dashboard-container"><UserManagement setSelectedUser={setSelectedUser} /></div>;
      case "posts":
        return <div className="dashboard-container"><PostManagement handleSendNotification={handleSendNotification} /></div>;
      case "transactions":
        return <div className="dashboard-container"><TransactionManagement /></div>;
      case "notifications":
        return <div className="dashboard-container"><NotificationManagement notifications={notifications} /></div>;
      case "revenue":
        return <div className="dashboard-container"><RevenueChart /></div>;
      case "settings":
        return <div className="dashboard-container"><SystemSettings /></div>;
      case "logout":
        handleLogout();  // Gọi hàm đăng xuất
        return <Navigate to="/Admin-Login" />;  // Dùng React Router để chuyển hướng
      default:
        return <div>Chọn chức năng</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 sidebar shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        </div>
        <nav className="mt-4">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`w-full text-left px-4 py-2 flex items-center space-x-2 ${activeView === item.view ? 'active' : ''}`}
              onClick={() => setActiveView(item.view === "logout" ? handleLogout() : item.view)}
            >
              <item.icon className="fa-icon" />
              <span>{item.text}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-1 p-10 overflow-auto dashboard-content">
        <h1 className="text-3xl font-bold mb-6 dashboard-title">{sidebarItems.find(item => item.view === activeView)?.text}</h1>
        {renderView()}
      </div>
      {selectedUser && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-content p-6">
            <h2 className="text-xl font-semibold mb-4">User Info</h2>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p><strong>Full Name:</strong> {selectedUser.fullname}</p>
            <p><strong>Birthdate:</strong> {selectedUser.birthdate}</p>
            <button
              onClick={() => setSelectedUser(null)}
              className="modal-close-btn mt-4 px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;