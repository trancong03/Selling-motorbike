import React, { useState, useEffect } from "react";
import axios from "axios";

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(""); // Chỉ lưu id người dùng
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
  });

  // Load danh sách thông báo
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/admin-api/thongbao/")  // API load thông báo
      .then((response) => setNotifications(response.data))
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  // Load danh sách người dùng
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/admin-api/nguoidung/")  // API load người dùng
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Lọc người dùng theo tìm kiếm
  useEffect(() => {
    const lowerSearch = searchUser.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.fullname.toLowerCase().includes(lowerSearch) ||
        user.iduser.toString().includes(lowerSearch)
    );
    setFilteredUsers(filtered);
  }, [searchUser, users]);

  // Hàm gửi thông báo
  const handleSendNotification = () => {
    // Kiểm tra xem đã chọn người dùng chưa
    if (!selectedUserId || !newNotification.title || !newNotification.message) {
      alert("Vui lòng điền đầy đủ thông tin và chọn người dùng.");
      return;
    }

    const payload = {
      bai_viet_id: null, // Không cần mã bài viết
      title: newNotification.title,
      message: newNotification.message,
      user_id: selectedUserId, // Mã người dùng
    };

    // Gửi request POST để tạo thông báo
    axios
      .post("http://localhost:8000/admin-api/gui-thong-bao/", payload)  // API gửi thông báo
      .then(() => {
        alert("Thông báo đã được gửi thành công.");
        setIsModalOpen(false);
        setNewNotification({ title: "", message: "" });
        setSelectedUserId(""); // Reset người dùng đã chọn

        // Reload lại danh sách thông báo
        return axios.get("http://127.0.0.1:8000/admin-api/thongbao/");
      })
      .then((response) => {
        setNotifications(response.data); // Cập nhật lại danh sách thông báo
      })
      .catch((error) => {
        console.log(payload);
        
        console.error("Error sending notification:", error);
        alert("Gửi thông báo thất bại.");
      });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quản lý thông báo</h2>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Danh sách thông báo</h3>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="table-auto w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Tiêu đề</th>
                <th className="px-4 py-2 text-left">Nội dung</th>
                <th className="px-4 py-2 text-left">Người dùng</th>
                <th className="px-4 py-2 text-left">Thời gian gửi</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{notification.mathongbao}</td>
                  <td className="px-4 py-2">{notification.tieude}</td>
                  <td className="px-4 py-2">{notification.noidung}</td>
                  <td className="px-4 py-2">{notification.manguoidung}</td>
                  <td className="px-4 py-2">
                    {new Date(notification.thoigiangui).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
      >
        Thêm thông báo
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-medium mb-4">Gửi thông báo</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Tìm kiếm người dùng</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded-lg"
                placeholder="Nhập tên hoặc mã người dùng"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Người dùng</label>
              <select
                className="w-full border px-3 py-2 rounded-lg"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                <option value="">Chọn người dùng</option>
                {filteredUsers.map((user) => (
                  <option key={user.iduser} value={user.iduser}>
                    [{user.iduser}] {user.fullname}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Tiêu đề</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded-lg"
                value={newNotification.title}
                onChange={(e) =>
                  setNewNotification({ ...newNotification, title: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Nội dung</label>
              <textarea
                className="w-full border px-3 py-2 rounded-lg"
                rows="4"
                value={newNotification.message}
                onChange={(e) =>
                  setNewNotification({ ...newNotification, message: e.target.value })
                }
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
              >
                Hủy
              </button>
              <button
                onClick={handleSendNotification}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationManagement;
