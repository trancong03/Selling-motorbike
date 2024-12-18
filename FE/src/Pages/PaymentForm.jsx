import React, { useState } from "react";
import axios from "axios";

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
        user_id: userId,
      });
      const { payUrl } = response.data;

      if (payUrl) {
        window.location.href = payUrl;
      } else {
        alert("Không tìm thấy đường dẫn thanh toán, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi tạo thanh toán:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="w-full w-[80%] h-[795px] max-height">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg w-full max-w h-full max-height"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg max-w h-full max-height">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 mb-6">
            Nạp tiền vào tài khoản
          </h1>
          <div className="w-[50%] border-b-2 bg-orange-500 border-orange-500 mb-5 p-0.5"></div>
          <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-4">Hình thức thanh toán:</h2>
        <p className="text-gray-600 mb-4">
          Bạn có thể thanh toán bằng ví điện tử Momo. Đây là phương thức thanh toán nhanh chóng và tiện lợi cho các giao dịch trực tuyến.
        </p>

        <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">Hướng dẫn thanh toán Momo:</h3>
          <ul className="text-white list-inside list-disc">
            <li>1. Mở ứng dụng Momo trên điện thoại của bạn.</li>
            <li>2. Chọn mục "Nạp tiền" hoặc "Chuyển tiền".</li>
            <li>3. Nhập số tiền cần nạp theo yêu cầu.</li>
            <li>4. Xác nhận giao dịch và kiểm tra thông tin trước khi thanh toán.</li>
            <li>5. Sau khi thanh toán thành công, hệ thống sẽ tự động cập nhật số dư trong tài khoản của bạn.</li>
          </ul>
        </div>
        <br/>
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-gray-600 font-medium mb-2"
        >
          Nhập số tiền muốn nạp:
        </label>
        <input
          type="number"
          id="amount"
          className="w-[30%] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập số tiền..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      
      <button
        type="button"
        className="w-[30%] py-2 px-4 bg-orange-500 text-white font-medium rounded-md hover:bg-green-500 transition duration-500"
      >
        Tạo thanh toán
      </button>
      <br/><br/><br/><br/>
      {/* Thêm phần Lưu ý */}
      <div className="mt-6 text-gray-600 text-sm">
        <p className="font-bold text-orange-500">Lưu ý:</p>
        <ul className="list-inside list-disc pl-4">
          <li>Vui lòng kiểm tra số tiền trước khi thực hiện giao dịch.</li>
          <li>Thanh toán sẽ được xử lý ngay lập tức sau khi bạn hoàn tất.</li>
          <li>Hãy đảm bảo thông tin tài khoản MoMo của bạn chính xác.</li>
          <li>Nếu gặp vấn đề, vui lòng liên hệ với chúng tôi qua hỗ trợ khách hàng.</li>
        </ul>
      </div>
    </div>

        </form>
  </div>

  );
};

export default PaymentForm;
