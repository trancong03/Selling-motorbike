import React, { useState } from "react";
import "./App.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import ErrorPage from "./Components/ErrorPage";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import DN from './Components/DN';
import Home from "./Pages/Home";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // Lưu trữ thông tin người dùng

  const handleLoginClick = () => {
    setShowLogin(true); // Khi click nút "Login", hiển thị DN
  };

  const closeLogin = () => {
    setShowLogin(false); // Đóng form đăng nhập
  };

  const handleLoginSuccess = (data) => {
    setUserInfo(data); // Cập nhật thông tin người dùng
    setShowLogin(false); // Đóng form đăng nhập
  };
  const handleLogout = () => {
    setUserInfo(null); // Xóa thông tin người dùng khi đăng xuất
  };

  return (
    <>
      <BrowserRouter>
        <Header userInfo={userInfo} setUserInfo={setUserInfo} onLoginClick={handleLoginClick} className="fixed top-0 left-0 w-full bg-white shadow-md z-50" />
        {showLogin && <DN closeLogin={closeLogin} onLoginSuccess={handleLoginSuccess}  />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
