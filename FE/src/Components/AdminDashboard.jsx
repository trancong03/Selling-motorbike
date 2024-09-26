import React, { useState } from "react";
import { FaUsers, FaNewspaper, FaExchangeAlt, FaFilter, FaBox, FaBullhorn, FaChartLine, FaShieldAlt, FaBell, FaHeadset, FaCog, FaLock, FaSignOutAlt, FaEdit, FaTrash, FaTimes, FaSearch, FaCalendarAlt, FaEnvelope } from "react-icons/fa";

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("posts");
  const [selectedUser, setSelectedUser] = useState(null);

  const sidebarItems = [
    { icon: FaUsers, text: "Người dùng", view: "users" },
    { icon: FaNewspaper, text: "Bài đăng", view: "posts" },
    { icon: FaExchangeAlt, text: "Giao dịch", view: "transactions" },
    { icon: FaFilter, text: "Danh mục và lọc", view: "categories" },
    { icon: FaBox, text: "Gói bài đăng", view: "packages" },
    { icon: FaChartLine, text: "Thống kê", view: "analytics" },
    { icon: FaShieldAlt, text: "Content Moderation", view: "moderation" },
    { icon: FaBell, text: "Thông báo", view: "notifications" },
    { icon: FaHeadset, text: "Hỗ trợ và đống góp", view: "support" },
    { icon: FaCog, text: "Cài đặt hệ thống", view: "settings" },
    { icon: FaLock, text: "Bảo mật", view: "security" },
    { icon: FaSignOutAlt, text: "Đăng xuất", view: "logout" }
  ];

  const renderView = () => {
    switch (activeView) {
      case "users":
        return <UserManagement setSelectedUser={setSelectedUser} />;
      case "posts":
        return <PostManagement />;
      case "transactions":
        return <TransactionManagement />;
      case "categories":
        return <CategoryManagement />;
      case "packages":
        return <PackageManagement />;
      case "analytics":
        return <SiteAnalytics />;
      case "moderation":
        return <ContentModeration />;
      case "notifications":
        return <NotificationManagement />;
      case "support":
        return <SupportFeedback />;
      case "settings":
        return <SystemSettings />;
      case "security":
        return <SecurityAccessControl />;
      case "logout":
        return <Logout />;
      default:
        return <div>Select a view from the sidebar</div>;
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

const UserManagement = ({ setSelectedUser }) => {
  const users = [
    { id: 1, username: "lhngnhn", name: "Lê Hồng Nhân", email: "nhanle2605@gmail.com", phone: "0372880194" },
    { id: 2, username: "trancong03", name: "Trần Chí Công", email: "trancong03@example.com", phone: "0354445564" },
    { id: 3, username: "hphung", name: "Hoàng Phi Hùng", email: "hoangphihung@example.com", phone: "0982223517" },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Quản lý người dùng</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên đăng nhập</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Điện thoại</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chức năng</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="text-blue-600 hover:text-blue-900 mr-2"
                  onClick={() => setSelectedUser(user)}
                >
                  View
                </button>
                <button className="text-green-600 hover:text-green-900 mr-2">
                  <FaEdit />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserInfoModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-4">User Information</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <FaEdit className="inline-block mr-1" /> Edit
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            <FaTrash className="inline-block mr-1" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const PostManagement = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: "Xe Dream cũ 2008", content: "Bán xác xe dream cũ về trang trí quán cafe.", dateCreated: "2023-05-01", owner: "Trần Chí Công" },
    { id: 2, title: "Xe wave mua lâu chạy rất kỹ", content: "Nên mua", dateCreated: "2023-05-02", owner: "Lê Hồng Nhân" },
    { id: 3, title: "Xe wave cũ 2022", content: "Chưa có", dateCreated: "2023-05-03", owner: "Hoàng Phi Hùng" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationData, setNotificationData] = useState({ header: "", content: "", owner: "" });

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = (!startDate || post.dateCreated >= startDate) &&
                        (!endDate || post.dateCreated <= endDate);
    return matchesSearch && matchesDate;
  });

  const handleRemovePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleSendNotification = (owner) => {
    setNotificationData({ ...notificationData, owner });
    setShowNotificationModal(true);
  };

  const handleSendNotificationSubmit = () => {
    // Here you would typically send the notification to the backend
    console.log("Sending notification:", notificationData);
    alert(`Notification sent to ${notificationData.owner}`);
    setShowNotificationModal(false);
    setNotificationData({ header: "", content: "", owner: "" });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Quản lý bài viết</h2>
      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Tìm kiếm</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Tìm kiếm bài viết"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ngày bắt đầuđầu</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="text-gray-400" />
            </div>
            <input
              type="date"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ngày kết thúc</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="text-gray-400" />
            </div>
            <input
              type="date"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredPosts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => setSelectedPost(post)}>
              <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{post.dateCreated}</td>
              <td className="px-6 py-4 whitespace-nowrap">{post.owner}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="text-red-600 hover:text-red-900 mr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemovePost(post.id);
                  }}
                >
                  <FaTrash />
                </button>
                <button
                  className="text-blue-600 hover:text-blue-900"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSendNotification(post.owner);
                  }}
                >
                  <FaEnvelope />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPost && (
        <PostInfoModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
      {showNotificationModal && (
        <NotificationModal
          notificationData={notificationData}
          setNotificationData={setNotificationData}
          onClose={() => setShowNotificationModal(false)}
          onSubmit={handleSendNotificationSubmit}
        />
      )}
    </div>
  );
};

const PostInfoModal = ({ post, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl relative max-w-2xl w-full">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
        <p className="mb-2"><strong>Date Created:</strong> {post.dateCreated}</p>
        <p className="mb-2"><strong>Owner:</strong> {post.owner}</p>
        <p className="mb-4"><strong>Content:</strong></p>
        <div className="bg-gray-100 p-4 rounded-md">
          <p>{post.content}</p>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <FaEdit className="inline-block mr-1" /> Edit
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            <FaTrash className="inline-block mr-1" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationModal = ({ notificationData, setNotificationData, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl relative max-w-2xl w-full">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-4">Gửi thông báo</h2>
        <p className="mb-2"><strong>Đến:</strong> {notificationData.owner}</p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={notificationData.header}
            onChange={(e) => setNotificationData({ ...notificationData, header: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nội dung</label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="4"
            value={notificationData.content}
            onChange={(e) => setNotificationData({ ...notificationData, content: e.target.value })}
          ></textarea>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={onSubmit}
          >
            Send Notification
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const TransactionManagement = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">Transaction Management</h2>
    <p>View and manage user transactions, payments, and financial records.</p>
  </div>
);

const CategoryManagement = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">Category & Filter Management</h2>
    <p>Create and manage categories and filters for posts and content.</p>
  </div>
);

const PackageManagement = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">Package and Promotion Management</h2>
    <p>Create and manage subscription packages and promotional offers.</p>
  </div>
);

const SiteAnalytics = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">Site Analytics</h2>
    <p>View site traffic, user engagement, and other important metrics.</p>
  </div>
);

const ContentModeration = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">Content Moderation</h2>
    <p>Review and moderate user-generated content to ensure community guidelines are followed.</p>
  </div>
);

const NotificationManagement = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">Notification Management</h2>
    <p>Manage system notifications and user communication preferences.</p>
  </div>
);

const SupportFeedback = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">Support & Feedback</h2>
    <p>Manage user support tickets and review user feedback.</p>
  </div>
);

const SystemSettings = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">System Settings</h2>
    <p>Configure global system settings and preferences.</p>
  </div>
);

const SecurityAccessControl = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">Security and Access Control</h2>
    <p>Manage admin access, roles, and security settings.</p>
  </div>
);

const Logout = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">Logout</h2>
    <p>Are you sure you want to log out?</p>
    <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Confirm Logout</button>
  </div>
);

export default AdminDashboard;