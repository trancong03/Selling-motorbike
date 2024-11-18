import React, { useState } from "react";
import { FaUsers, FaChartLine, FaNewspaper, FaExchangeAlt, FaFilter, FaBell, FaHeadset, FaCog, FaLock, FaSignOutAlt } from "react-icons/fa";
import UserManagement from "./UserManagement";
import PostManagement from "./PostManagement";
import NotificationManagement from "./NotificationManagement";
import RevenueReport from "./RevenueReport";
import RevenueChart from "./RevenueChart";
import TransactionManagement from "./TransactionManagement";
import SystemSettings from "./SystemSettings.jsx";


const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("users");
  const [selectedUser, setSelectedUser] = useState(null);
  const [notifications, setNotifications] = useState([]); // State để lưu các thông báo đã gửi

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

  const renderView = () => {
    switch (activeView) {
      case "users":
        return <UserManagement setSelectedUser={setSelectedUser} />;
      case "posts":
        return <PostManagement handleSendNotification={handleSendNotification} />;
      case "transactions":
        return <TransactionManagement />;
      // case "categories":
      //   return <CategoryManagement />;
      case "notifications":
        return <NotificationManagement notifications={notifications} />;
      case "revenue":
        return <RevenueChart />;
      // case "support":
      //   return <SupportFeedback />;
       case "settings":
        return <SystemSettings />;
      // case "security":
      //   return <SecurityAccessControl />;
      case "logout":
        return <Logout />;
      default:
        return <div>Chọn chức năng</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
        </div>
        <nav className="mt-4">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-200 ${activeView === item.view ? 'bg-gray-200' : ''}`}
              onClick={() => setActiveView(item.view)}
            >
              <item.icon className="text-gray-600" />
              <span>{item.text}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-1 p-10 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">{sidebarItems.find(item => item.view === activeView)?.text}</h1>
        {renderView()}
      </div>
      {selectedUser && (
        <UserInfoModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

const UserInfoModal = ({ user, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">User Info</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Full Name:</strong> {user.fullname}</p>
      <p><strong>Birthdate:</strong> {user.birthdate}</p>
      <button
        onClick={onClose}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Close
      </button>
    </div>
  </div>
);

export default AdminDashboard;
