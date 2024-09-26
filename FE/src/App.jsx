import React, { useEffect, useState } from "react";
import "./App.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import ErrorPage from "./Components/Footer/ErrorPage";
import Header from "./Components/Header/Header";
import DN from './Components/Header/DN';
import Home from "./Pages/Home";
import Account from "./Pages/Account";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({}); // Lưu trữ thông tin người dùng

  const handleLoginClick = () => {
    setShowLogin(true); // Khi click nút "Login", hiển thị DN
  };

  const closeLogin = () => {
    setShowLogin(false); // Đóng form đăng nhập
  };

  const handleLoginSuccess = (data) => {
    setUserInfo(data.user); // Cập nhật thông tin người dùng
    localStorage.setItem('userInfo', JSON.stringify(data.user));
    setShowLogin(false); // Đóng form đăng nhập
  };
 
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo)); // Tải thông tin từ localStorage
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <Header userInfo={userInfo} setUserInfo={setUserInfo} onLoginClick={handleLoginClick} className="fixed top-0 left-0 w-full bg-white shadow-md z-50" />
        {showLogin && <DN closeLogin={closeLogin} onLoginSuccess={handleLoginSuccess}  />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/account" element={<Account user = {userInfo} setUserInfo={setUserInfo} />}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
