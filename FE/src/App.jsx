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
import InfomationAccount from "./Components/userUI/InfomationAccount";
import ResetPassWord from "./Components/userUI/ResetPassWord";
import ForgotPassword from "./Components/userUI/ForgotPassword";
import { CartProvider } from "./Components/context/CardContext";
import ProductDetail from "./Pages/ProductDetail";
import NewPost from "./Pages/NewPost";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setIsForgotPasswordVisible(false); // Đảm bảo quên mật khẩu không được hiển thị khi đăng nhập
  };

  const closeLogin = () => {
    setShowLogin(false);
    setIsForgotPasswordVisible(false); // Đóng cả hai khi thoát
  };
  const closeForgotPassword = () => {
    setIsForgotPasswordVisible(false); // Đóng cả hai khi thoát
  };


  const handleLoginSuccess = (data) => {
    setUserInfo(data.user);
    localStorage.setItem('userInfo', JSON.stringify(data.user));
    setShowLogin(false);
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      try {
        setUserInfo(JSON.parse(storedUserInfo));
      } catch (error) {
        console.error('Invalid JSON in localStorage', error);
      }
    }
  }, []);

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordVisible(true);
  };
  return (
    <CartProvider personID={userInfo.manguoidung }>
      <BrowserRouter>
        <Header userInfo={userInfo} setUserInfo={setUserInfo} onLoginClick={handleLoginClick} className="fixed top-0 left-0 w-full bg-white shadow-md z-50" />
        {showLogin && (
          <DN
            closeLogin={closeLogin}
            onLoginSuccess={handleLoginSuccess}
            onForgotPassword={handleForgotPasswordClick}
          />
        )}
        {isForgotPasswordVisible && <ForgotPassword closeForgotPassword={closeForgotPassword} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account/*" element={<Account user={userInfo} setUserInfo={setUserInfo} />}>
            <Route path="info" element={<InfomationAccount user={userInfo} setUserInfo={setUserInfo} />} />
            <Route path="reset-password" element={<ResetPassWord user={userInfo} />} />
          </Route>
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}
 

export default App;
