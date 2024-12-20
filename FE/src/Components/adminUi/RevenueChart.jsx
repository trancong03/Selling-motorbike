import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "../../Style/RevenueChart.css";
// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  const [transactions, setTransactions] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [viewType, setViewType] = useState('daily'); // 'daily', 'monthly'

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/admin-api/naptientaikhoan/")
      .then((response) => {
        setTransactions(response.data);
        handleFilter(); // Lọc lại dữ liệu khi có dữ liệu mới
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  const handleFilter = () => {
    let filtered = transactions;
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      filtered = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.thoigiannap);
        return transactionDate >= from && transactionDate <= to;
      });
    }
    setFilteredTransactions(filtered);
    calculateTotalRevenue(filtered);
  };

  const calculateTotalRevenue = (transactions) => {
    const total = transactions.reduce((sum, transaction) => sum + parseFloat(transaction.sotiennap), 0);
    setTotalRevenue(total);
  };

  // Chuẩn bị dữ liệu cho biểu đồ theo ngày
  const getDailyData = () => {
    const dailyData = filteredTransactions.reduce((acc, transaction) => {
      const date = new Date(transaction.thoigiannap).toLocaleDateString();
      acc[date] = (acc[date] || 0) + parseFloat(transaction.sotiennap);
      return acc;
    }, {});
    return {
      labels: Object.keys(dailyData),
      datasets: [{
        label: "Doanh thu hàng ngày (VND)",
        data: Object.values(dailyData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      }],
    };
  };

  // Chuẩn bị dữ liệu cho biểu đồ theo tháng
  const getMonthlyData = () => {
    const monthlyData = filteredTransactions.reduce((acc, transaction) => {
      const date = new Date(transaction.thoigiannap);
      const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      acc[monthYear] = (acc[monthYear] || 0) + parseFloat(transaction.sotiennap);
      return acc;
    }, {});
    return {
      labels: Object.keys(monthlyData),
      datasets: [{
        label: "Doanh thu hàng tháng (VND)",
        data: Object.values(monthlyData),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        type: 'line',
      }],
    };
  };

  const chartData = viewType === 'daily' ? getDailyData() : getMonthlyData();

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: viewType === 'daily' ? "Thống kê doanh thu theo ngày" : "Thống kê doanh thu theo tháng",
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
      <h2 className="text-2xl font-bold mb-4 text-center">Thống kê doanh thu</h2>

      <div className="mb-4 flex justify-between items-center">
        <div>
          <label className="mr-2">Từ ngày:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border p-2 mr-2"
          />
          <label className="mr-2">Đến ngày:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border p-2"
          />
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          >
            Lọc
          </button>
        </div>
        <div>
          <button 
            onClick={() => setViewType('daily')}
            className={`px-4 py-2 rounded ${viewType === 'daily' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          >
            Ngày
          </button>
          <button 
            onClick={() => setViewType('monthly')}
            className={`px-4 py-2 rounded ml-2 ${viewType === 'monthly' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          >
            Tháng
          </button>
        </div>
      </div>

      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold">
          Tổng doanh thu: {totalRevenue.toLocaleString()} VND
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-4">
        {viewType === 'daily' ? (
                    <Bar data={chartData} options={chartOptions} />
                  ) : (
                    <Line data={chartData} options={chartOptions} />
                  )}
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
                    {filteredTransactions.map((transaction) => (
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