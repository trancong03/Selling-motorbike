import React, { useState, useEffect } from "react";
import "../../Style/AboutUs.css";
export default function AboutUs() {
  const [aboutInfo, setAboutInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm lấy thông tin giới thiệu từ API
  useEffect(() => {
    const fetchAboutInfo = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/admin-api/thuoctinhhethong/");
        if (!response.ok) {
          throw new Error("Failed to fetch about information");
        }
        const data = await response.json();

        // Tìm phần tử có id lớn nhất
        const maxIdInfo = data.reduce((max, current) => (current.id > max.id ? current : max), data[0]);

        setAboutInfo(maxIdInfo);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutInfo();
  }, []);

  // Hiển thị khi đang tải hoặc có lỗi
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Hiển thị thông tin giới thiệu nếu có
  return (
    <div className="about-us-container">
      <h1>Giới Thiệu</h1>
      {aboutInfo ? (
        <div dangerouslySetInnerHTML={{ __html: aboutInfo.tranggioithieu }} />
      ) : (
        <p>Không có thông tin giới thiệu.</p>
      )}
    </div>
  );
}
