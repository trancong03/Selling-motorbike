import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch transactions and users from the API
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/naptientaikhoan/")
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error("Có lỗi xảy ra khi lấy dữ liệu giao dịch:", error);
      });

    axios.get("http://127.0.0.1:8000/api/nguoidung/")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Có lỗi xảy ra khi lấy dữ liệu người dùng:", error);
      });
  }, []);

  // Find user full name by userId
  const findUserName = (userId) => {
    const user = users.find(u => u.iduser.trim() === userId.trim());
    return user ? user.fullname : "Không rõ";
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Quản lý giao dịch</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã giao dịch</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người dùng</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số tiền nạp</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian nạp</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">{transaction.magiaodich.trim()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{findUserName(transaction.manguoidung)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{parseFloat(transaction.sotiennap).toLocaleString('vi-VN')} VND</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(transaction.thoigiannap).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionManagement;
