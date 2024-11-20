import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [newTransaction, setNewTransaction] = useState({
    maloaigiaodich: "",
    tenloaigiaodich: "",
    sotien: "",
    songay: "",
  });
  const apiUrl = "http://localhost:8000/admin-api/goigiaodich/";

  // Fetch transactions on component load
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(apiUrl);
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const handleInputChange = (e, transaction = newTransaction, setTransaction = setNewTransaction) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleAddTransaction = async () => {
    try {
      const response = await axios.post(apiUrl, newTransaction);
      setTransactions([...transactions, response.data]);
      setNewTransaction({ maloaigiaodich: "", tenloaigiaodich: "", sotien: "", songay: "" });
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  };

  const handleUpdateTransaction = async () => {
    try {
      const response = await axios.put(`${apiUrl}${editingTransaction.maloaigiaodich}/`, editingTransaction);
      setTransactions(
        transactions.map((t) => (t.maloaigiaodich === editingTransaction.maloaigiaodich ? response.data : t))
      );
      setEditingTransaction(null);
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  };

  const handleDeleteTransaction = async (maloaigiaodich) => {
    try {
      await axios.delete(`${apiUrl}${maloaigiaodich}/`);
      setTransactions(transactions.filter((t) => t.maloaigiaodich !== maloaigiaodich));
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Quản lý gói giao dịch</h2>

      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Mã giao dịch</th>
            <th className="border px-4 py-2">Tên gói</th>
            <th className="border px-4 py-2">Số tiền</th>
            <th className="border px-4 py-2">Số ngày</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.maloaigiaodich}>
              <td className="border px-4 py-2">{transaction.maloaigiaodich.trim()}</td>
              <td className="border px-4 py-2">{transaction.tenloaigiaodich}</td>
              <td className="border px-4 py-2">{parseFloat(transaction.sotien).toLocaleString("vi-VN")} VND</td>
              <td className="border px-4 py-2">{transaction.songay} ngày</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => setEditingTransaction(transaction)}
                >
                  Sửa
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteTransaction(transaction.maloaigiaodich)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-lg font-bold mt-6">Thêm gói giao dịch</h3>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <input
          type="text"
          name="maloaigiaodich"
          placeholder="Mã gói"
          value={newTransaction.maloaigiaodich}
          onChange={handleInputChange}
          className="border p-2"
        />
        <input
          type="text"
          name="tenloaigiaodich"
          placeholder="Tên gói"
          value={newTransaction.tenloaigiaodich}
          onChange={handleInputChange}
          className="border p-2"
        />
        <input
          type="text"
          name="sotien"
          placeholder="Số tiền"
          value={newTransaction.sotien}
          onChange={handleInputChange}
          className="border p-2"
        />
        <input
          type="text"
          name="songay"
          placeholder="Số ngày"
          value={newTransaction.songay}
          onChange={handleInputChange}
          className="border p-2"
        />
      </div>
      <button
        onClick={handleAddTransaction}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Thêm mới
      </button>

      {editingTransaction && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Sửa gói giao dịch</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="maloaigiaodich"
              placeholder="Mã gói"
              value={editingTransaction.maloaigiaodich}
              onChange={(e) => handleInputChange(e, editingTransaction, setEditingTransaction)}
              className="border p-2"
              disabled
            />
            <input
              type="text"
              name="tenloaigiaodich"
              placeholder="Tên gói"
              value={editingTransaction.tenloaigiaodich}
              onChange={(e) => handleInputChange(e, editingTransaction, setEditingTransaction)}
              className="border p-2"
            />
            <input
              type="text"
              name="sotien"
              placeholder="Số tiền"
              value={editingTransaction.sotien}
              onChange={(e) => handleInputChange(e, editingTransaction, setEditingTransaction)}
              className="border p-2"
            />
            <input
              type="text"
              name="songay"
              placeholder="Số ngày"
              value={editingTransaction.songay}
              onChange={(e) => handleInputChange(e, editingTransaction, setEditingTransaction)}
              className="border p-2"
            />
          </div>
          <button
            onClick={handleUpdateTransaction}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Cập nhật
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionManagement;
