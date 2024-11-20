import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

// Modal component to display user details
const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Thông tin người dùng</h2>
        <p><strong>Tên đăng nhập:</strong> {user.username}</p>
        <p><strong>Họ tên:</strong> {user.fullname}</p>
        <p><strong>Ngày sinh:</strong> {user.birthdate}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Địa chỉ:</strong> {user.address}</p>
        <p><strong>Điện thoại:</strong> {user.phone}</p>
        <p><strong>Giới tính:</strong> {user.gender}</p>
        <p><strong>CMND:</strong> {user.identity_card}</p>
        <p><strong>Mô tả:</strong> {user.discription}</p>
        <p><strong>Số dư:</strong> {user.balance}</p>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
          Đóng
        </button>
      </div>
    </div>
  );
};

// Modal component to edit user details
const EditUserModal = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Chỉnh sửa thông tin người dùng</h2>
        <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} className="mb-2 p-2 w-full border rounded" placeholder="Họ tên" />
        <input type="text" name="birthdate" value={formData.birthdate} onChange={handleChange} className="mb-2 p-2 w-full border rounded" placeholder="Ngày sinh" />
        <input type="text" name="email" value={formData.email} onChange={handleChange} className="mb-2 p-2 w-full border rounded" placeholder="Email" />
        <input type="text" name="address" value={formData.address} onChange={handleChange} className="mb-2 p-2 w-full border rounded" placeholder="Địa chỉ" />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="mb-2 p-2 w-full border rounded" placeholder="Điện thoại" />
        <input type="text" name="gender" value={formData.gender} onChange={handleChange} className="mb-2 p-2 w-full border rounded" placeholder="Giới tính" />
        <input type="text" name="identity_card" value={formData.identity_card} onChange={handleChange} className="mb-2 p-2 w-full border rounded" placeholder="CMND" />
        <input type="text" name="discription" value={formData.discription} onChange={handleChange} className="mb-2 p-2 w-full border rounded" placeholder="Mô tả" />
        <input type="text" name="balance" value={formData.balance} onChange={handleChange} className="mb-2 p-2 w-full border rounded" placeholder="Số dư" />
        <button onClick={handleSave} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg mr-2">
          Lưu
        </button>
        <button onClick={onClose} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg">
          Hủy
        </button>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Fetch users from the admin-api
    axios.get("http://127.0.0.1:8000/admin-api/nguoidung/")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
      });
  }, []);

  // Function to handle delete
  const handleDelete = (iduser) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
    if (confirmed) {
      axios.delete(`http://127.0.0.1:8000/admin-api/nguoidung/${iduser}/`)
        .then(() => {
          setUsers(users.filter(user => user.iduser !== iduser));
          alert("Xóa thành công!");
        })
        .catch(error => {
          console.error("Có lỗi xảy ra khi xóa người dùng:", error);
        });
    }
  };

  // Function to handle save after editing
  const handleSave = (updatedUser) => {
    axios.put(`http://127.0.0.1:8000/admin-api/nguoidung/${updatedUser.iduser}/`, updatedUser)
      .then(() => {
        setUsers(users.map(user => user.iduser === updatedUser.iduser ? updatedUser : user));
        setEditingUser(null);
        alert("Cập nhật thành công!");
      })
      .catch(error => {
        console.error("Có lỗi xảy ra khi cập nhật người dùng:", error);
      });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Quản lý người dùng</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên đăng nhập</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày sinh</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chức năng</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.iduser} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">{user.username.trim()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.fullname}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.birthdate}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="text-blue-600 hover:text-blue-900 mr-2"
                  onClick={() => setSelectedUser(user)}
                >
                  View
                </button>
                <button
                  className="text-green-600 hover:text-green-900 mr-2"
                  onClick={() => setEditingUser(user)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDelete(user.iduser)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to show user details */}
      {selectedUser && <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />}

      {/* Modal to edit user details */}
      {editingUser && <EditUserModal user={editingUser} onSave={handleSave} onClose={() => setEditingUser(null)} />}
    </div>
  );
};

export default UserManagement;
