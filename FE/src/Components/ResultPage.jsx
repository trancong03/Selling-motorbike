import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../Style/ResultPage.css"; // CSS riêng cho trang này

const ResultPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Lấy kết quả giao dịch từ query params (MoMo trả về)
    const resultCode = searchParams.get("resultCode");
    if (resultCode === "0") {
      setStatus("success");
    } else {
      setStatus("failure");
    }
  }, [searchParams]);

  return (
    <div className="result-page">
      <div className={`result-container ${status}`}>
        {status === "success" ? (
          <>
            <h1 className="result-title"> Giao dịch thành công! </h1>
            <p className="result-message">
              Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Giao dịch của bạn đã được xử lý thành công.
            </p>
          </>
        ) : (
          <>
            <h1 className="result-title">❌ Giao dịch thất bại</h1>
            <p className="result-message">
              Rất tiếc, giao dịch của bạn không thành công hoặc đã bị hủy. Vui lòng thử lại sau.
            </p>
          </>
        )}
        <a href="/" className="result-btn">
          Quay lại trang chủ
        </a>
      </div>
    </div>
  );
};

export default ResultPage;
