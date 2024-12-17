import React, { useState } from "react";
import axios from "axios";
import "../Style/PaymentForm.css"; // Thêm file CSS riêng

const PaymentForm = () => {
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userId = userInfo?.manguoidung;
  
    if (!userId) {
      alert("Không tìm thấy thông tin người dùng!");
      return;
    }
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/payment/create/", {
        amount: amount,
        user_id: userId, // Truyền user_id vào body
      });
      const { payUrl } = response.data;
  
      if (payUrl) {
        window.location.href = payUrl; // Chuyển hướng tới payUrl
      } else {
        alert("Không tìm thấy đường dẫn thanh toán, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi tạo thanh toán:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="payment-form-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <h1 className="form-title">Nạp tiền vào tài khoản</h1>
        <label htmlFor="amount" className="form-label">
          Nhập số tiền muốn nạp:
        </label>
        <input
          type="number"
          id="amount"
          className="form-input"
          placeholder="Nhập số tiền..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit" className="form-button">
          Tạo thanh toán
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
