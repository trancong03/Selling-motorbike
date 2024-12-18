import React, { useEffect, useState } from "react";
import "./App.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import axios from "axios";
import PostOfUser from "./Components/userUI/PostOfUser";
import AdminLogin from "./Components/adminUi/AdminLogin";
import AdminDashboard from "./Components/adminUi/AdminDashboard";
import UpdatePost from "./Pages/UpdatePost";
import ErrorBoundary from "./ErrorBoundary";
import IntroductionSection from "./Components/IntroductionSection";
import PaymentForm from "./Pages/PaymentForm";
import ResultPage from "./Components/ResultPage";
import ProductLike from "./Pages/ProductLike";
import SearchProduct from './Components/product/SearchProduct';
import AboutUs from "../src/Components/ui/AboutUs";

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
    const { token } = data;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userInfo', JSON.stringify(data.user));
    setShowLogin(false);
  };
  const getUserById = async (iduser) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user/${iduser}/`);
      if (response.status === 200) {
        return response.data.user; // Trả về thông tin người dùng
      }
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data.error);
        return null;
      } else {
        console.error('Network Error:', error.message);
        return null;
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        try {
          const userData = JSON.parse(storedUserInfo);
          const user = await getUserById(userData?.manguoidung);
          setUserInfo(user); // Cập nhật state với dữ liệu người dùng
        } catch (error) {
          console.error('Invalid JSON in localStorage', error);
          setError('Có lỗi xảy ra khi lấy thông tin người dùng.');
        }
      }
    };

    fetchUserData(); // Gọi hàm lấy dữ liệu người dùng
  }, []);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo)); // Tải thông tin từ localStorage
    }
  }, []);

  const PrivateRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('admin');
    const isAdmin = isAuthenticated && JSON.parse(isAuthenticated).is_superuser;

    // Nếu không phải admin hoặc không có thông tin đăng nhập, chuyển hướng về trang đăng nhập admin
    return isAdmin ? <Component {...rest} /> : <Navigate to="/Admin-Login" replace />;
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordVisible(true);
  };
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    // Kiểm tra nếu đường dẫn có chứa '/admin' hoặc '/Admin-Login'
    const path = window.location.pathname;
    setIsAdminRoute(path.includes('/admin') || path.includes('/Admin-Login'));
  }, []); // Chạy một lần khi component mount

  return (
    <CartProvider User={userInfo} onLoginClick={handleLoginClick} >
      <BrowserRouter>
        {/* Điều chỉnh Header chỉ hiển thị khi không phải là các route admin */}
        {!isAdminRoute && (
          <Header userInfo={userInfo} setUserInfo={setUserInfo} onLoginClick={handleLoginClick} className="fixed top-0 left-0 w-full bg-white shadow-md z-50" />
        )}

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
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/payment-result" element={<ResultPage/>} />
          <Route path="/account/*" element={<Account user={userInfo} setUserInfo={setUserInfo} />}>
            <Route path="like-product" element={<ErrorBoundary><ProductLike /></ErrorBoundary>} />
            <Route path="info" element={<InfomationAccount user={userInfo} setUserInfo={setUserInfo} />} />
            <Route path="reset-password" element={<ResetPassWord user={userInfo} />} />
            <Route path="user-post/" element={<PostOfUser userId={userInfo} />} />
          </Route>
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/search-product/" element={<SearchProduct />} />
          <Route path="/new-post" element={<ErrorBoundary><NewPost /></ErrorBoundary>} />
          <Route path="/update-post" element={<ErrorBoundary><UpdatePost /></ErrorBoundary>} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/admin" element={<PrivateRoute element={AdminDashboard} />} />
          <Route path="/Admin-Login" element={<AdminLogin />} />
          <Route path="/introduction" element={<IntroductionSection />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
};
export default App;