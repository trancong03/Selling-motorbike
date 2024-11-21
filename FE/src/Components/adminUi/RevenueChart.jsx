import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {
  const [transactions, setTransactions] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0); // Thêm state để lưu tổng doanh thu

  useEffect(() => {
    // Lấy dữ liệu từ admin-api
    axios
      .get("http://127.0.0.1:8000/admin-api/naptientaikhoan/")
      .then((response) => {
        setTransactions(response.data);
        setFilteredTransactions(response.data); // Mặc định hiển thị tất cả giao dịch
        calculateTotalRevenue(response.data); // Tính tổng doanh thu mặc định
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  const handleFilter = () => {
    const from = new Date(fromDate);
    const to = new Date(toDate);

    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.thoigiannap);
      return transactionDate >= from && transactionDate <= to;
    });

    setFilteredTransactions(filtered);
    calculateTotalRevenue(filtered); // Tính lại tổng doanh thu sau khi lọc
  };

  // Hàm tính tổng doanh thu
  const calculateTotalRevenue = (transactions) => {
    const total = transactions.reduce((sum, transaction) => {
      return sum + parseFloat(transaction.sotiennap);
    }, 0);
    setTotalRevenue(total);
  };

  // Chuẩn bị dữ liệu cho biểu đồ
  const chartData = {
    labels: filteredTransactions.map((transaction) =>
      new Date(transaction.thoigiannap).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: filteredTransactions.map((transaction) =>
          parseFloat(transaction.sotiennap)
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Thống kê doanh thu theo ngày",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString() + " VND";
          },
        },
      },
    },
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Thống kê doanh thu</h2>

      <div className="mb-4">
        <label className="mr-2">Từ ngày:</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 mr-4"
        />
        <label className="mr-2">Đến ngày:</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 mr-4"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Lọc
        </button>
      </div>

      {/* Hiển thị tổng doanh thu */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">
          Tổng doanh thu: {totalRevenue.toLocaleString()} VND
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Biểu đồ doanh thu */}
        <div className="col-span-1">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
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

export default RevenueChart;
