import React, { useState } from "react";
import axios from "axios";

const RevenueReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Hàm lấy dữ liệu từ admin-api và tính tổng doanh thu
  const fetchTransactions = () => {
    // Kiểm tra nếu ngày bắt đầu và kết thúc được nhập vào
    if (!startDate || !endDate) {
      alert("Vui lòng nhập khoảng thời gian hợp lệ.");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/admin-api/naptientaikhoan/")
      .then((response) => {
        // Lọc các giao dịch theo khoảng thời gian
        const filteredTransactions = response.data.filter((transaction) => {
          const transactionDate = new Date(transaction.thoigiannap);
          return (
            transactionDate >= new Date(startDate) &&
            transactionDate <= new Date(endDate)
          );
        });

        // Cập nhật danh sách giao dịch và tính tổng doanh thu
        setTransactions(filteredTransactions);

        const total = filteredTransactions.reduce(
          (sum, transaction) => sum + parseFloat(transaction.sotiennap),
          0
        );
        setTotalRevenue(total);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Thống kê doanh thu</h2>
      
      <button
        onClick={fetchTransactions}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Thống kê
      </button>

      <h3 className="text-lg font-semibold mt-6">Kết quả:</h3>
      <p>Tổng doanh thu: {totalRevenue.toLocaleString()} VND</p>

      <h4 className="text-lg font-semibold mt-4">Danh sách giao dịch:</h4>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã giao dịch</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số tiền</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian nạp</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.magiaodich}>
              <td className="px-6 py-4 whitespace-nowrap">{transaction.magiaodich.trim()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{parseFloat(transaction.sotiennap).toLocaleString()} VND</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(transaction.thoigiannap).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RevenueReport;
