import { BellRing, FilePenIcon, HomeIcon, NotebookText, Heart, LogOut, Search, ShoppingCart as ShoppingCartIcon, Info, ListOrdered, Wallet } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../Style/noti.css"
export default function Header({ onLoginClick, userInfo, setUserInfo }) {
  const [isSticky, setIsSticky] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]); // State chứa thông báo
  const [isAnimatingClose, setIsAnimatingClose] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    if (userInfo == null || !userInfo) {
      onLoginClick();
    } else {
      navigate('/account');
    }
  };

  const handleDangTinClick = () => {
    if (userInfo == null || !userInfo) {
      onLoginClick();
    } else {
      navigate('/new-post');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/notifications');
      setNotifications(response.data); // Cập nhật state với dữ liệu thông báo
    } catch (error) {
      console.error('Lỗi khi tải thông báo:', error);
    }
  };

  useEffect(() => {
    fetchNotifications(); // Gọi API để lấy thông báo khi component được render
  }, []);
  useEffect(() => {
    if (userInfo && userInfo.manguoidung) {
      fetch(`http://localhost:8000/admin-api/thongbaonguoidung/${userInfo.manguoidung}/`)
        .then(response => response.json())
        .then(data => setNotifications(data))
        .catch(error => console.error('Error fetching notifications:', error));
    }
  }, [userInfo]);
  
  const handleAuthClick = () => {
    if (userInfo != null) {
      setUserInfo(null);
      localStorage.removeItem('userInfo'); // Xóa thông tin người dùng khỏi localStorage
      navigate('/'); // Điều hướng về trang chính
    } else {
      onLoginClick(); // Gọi hàm đăng nhập khi không có thông tin người dùng
    }
    setIsMenuOpen(false);
  };

console.log(userInfo);

  const handleNavigation = (path) => {
    if (!userInfo || !userInfo.hoten) {
      onLoginClick();
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search-product?search-query=${encodeURIComponent(query)}`);
    }
  };
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('vi-VN', { // 'vi-VN' for Vietnamese locale, adjust if needed
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderNotificationDropdown = () => {
    const classes = `notification-dropdown absolute top-[8.5vh] mt-2 bg-white border rounded shadow-md w-[400px] z-50 ${isAnimatingClose ? 'closing' : ''}`;
    
    return (
      <div 
        ref={menuRef}
        className={classes}
        onAnimationEnd={() => {
          if (isAnimatingClose) {
            setIsNotificationOpen(false);
            setIsAnimatingClose(false);
          }
        }}
      >
        {notifications.length > 0 ? (
          <ul className="space-y-4">
          {notifications.map(notification => (
            <li key={notification.mathongbao} className="p-2 border-b last:border-b-0">
              <div className="text-sm font-bold notification-title">{notification.tieude}</div>
              <div className="text-xs notification-content">{notification.noidung}</div>
              <div className="text-xs text-gray-500 notification-time">{formatDateTime(notification.thoigiangui)}</div>
            </li>
          ))}
        </ul>
        ) : (
          <p className="p-2 text-sm">Không có thông báo</p>
        )}
      </div>
    );
  };


  const handleNotificationClick = (e) => {
    e.preventDefault();
    if (isNotificationOpen) {
      // If already open, start closing animation
      setIsAnimatingClose(true);
      setTimeout(() => {
        setIsNotificationOpen(false);
        setIsAnimatingClose(false);
      }, 300); // Match the animation duration
    } else {
      setActiveLink("BellRing");
      setIsNotificationOpen(true);
    }
  };

  return (
    <div className={`transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 w-full shadow-md z-50' : ''}`}>
      <div className=" h-20 flex items-center bg-gradient-to-r from-orange-400 to-yellow-400 p-3 ">
        <div className=" mr-5">
          <img
            className="h-16 w-40"
            src="http://127.0.0.1:8000//media/images/logo.png"
            alt="Logo"
          />
        </div>
        <div className="hidden lg:flex items-center justify-between py-2 rounded-xl h-[5vh] w-[30vw] bg-[#f3f3f3]">
          <input
            className="ml-2 w-[20vw] bg-transparent focus:outline-none placeholder-gray-500 text-gray-700"
            type="text" 
            placeholder="Tìm sản phẩm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>
            <Search />
          </button>
        </div>
        <div className="ml-3 flex gap-4 justify-center items-center">
          <a
            onClick={() => {
              setActiveLink("heart"); // Đánh dấu liên kết đang hoạt động
              handleNavigation('/account/like-product'); // Xử lý điều hướng
            }}
            className={`text-[#5b5858cc] flex gap-2 items-center font-arial px-3 py-2 ${activeLink === "heart" ? "text-black font-bold" : "hover:text-black"
              }`}
          >
            <Heart />
          </a>
          <a
            href="#"
            onClick={handleNotificationClick}
            className={`text-[#5b5858cc]  flex gap-2 items-center  font-arial  px-3 py-2 ${activeLink === "BellRing" ? "text-black font-bold" : "hover:text-black"}`}
          >
            <BellRing />
          </a>
          {isNotificationOpen && renderNotificationDropdown()}
          
          
        </div>
        <div className="px-3 py-2 h-10 w-[12vw] bg-transparent rounded-3xl flex items-center justify-start">
          <a
            href="/"
            onClick={() => setActiveLink("home")}
            className={`text-[#5b5858cc]  flex gap-2 items-center  font-arial  px-3 py-2 ${activeLink === "home" ? "text-black font-bold" : "hover:text-black"}`}
          >
            <HomeIcon />
            Trang Chủ
          </a>
        </div>
        <div className="px-3 py-2 h-10 w-[12vw] bg-transparent rounded-3xl flex items-center justify-start">
          <a
            onClick={() => {setActiveLink("qltin")
              handleNavigation('/account/user-post');
            }}
            className={`text-[#5b5858cc]  flex gap-2 items-center  font-arial  px-3 py-2 ${activeLink === "qltin"
              ? "text-black font-bold"
              : "hover:text-black "}`}
          >
            <NotebookText />
            Quản lý tin
          </a>
        </div>
        <div className="px-3 py-2 h-10 w-[10vw] bg-transparent rounded-3xl flex items-center justify-start">
          <a
            href="/aboutus"
            onClick={() => setActiveLink("aboutus")}
            className={`text-[#5b5858cc]  flex gap-2 items-center font-arial  px-3 py-2 ${activeLink === "aboutus" ? "text-black font-bold" : "hover:text-black"}`}
          >
            Giới Thiệu
          </a>
        </div>
        <div className="px-3 py-2 h-10 w-[20vw] bg-transparent rounded-3xl flex items-center justify-start relative">
          <nav className="relative">
            <a
              onClick={() => {
                setActiveLink("dn");
                setIsMenuOpen(!isMenuOpen);
              }}
              className={`text-[#5b5858cc] flex gap-2 items-center font-arial px-3 py-2 ${activeLink === "dn" ? "text-black font-bold" : "hover:text-black"}`}
            >
              <img
                src={userInfo && userInfo.anhdaidien ? `http://127.0.0.1:8000/media/images/${userInfo.anhdaidien}` : "http://127.0.0.1:8000//media/images/icon.png"}
                alt="User anhdaidien"
                className="w-12 h-12 rounded-full"
              />
              {userInfo?.hoten || "Tài khoản"}
            </a>

            {isMenuOpen && (
              <div ref={menuRef} className="absolute top-[8.5vh] mt-2 bg-white border rounded shadow-md w-60 z-50">
                <ul className="space-y-4">
                  <li
                    className="flex justify-start ml-3 items-center hover:bg-gray-200"
                    onClick={() => handleNavigation('/account')}
                  >
                    <Info />
                    <a className="block p-2 rounded">Thông tin tài khoản</a>
                  </li>
                  <li
                    className="flex justify-start ml-3 items-center hover:bg-gray-200"
                    onClick={handleAuthClick}
                  >
                    <LogOut />
                    <a className="block p-2 rounded">
                      {userInfo == null || !userInfo.hoten ? 'Login' : 'Logout'}
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </div>
        <div className="px-3 py-2 h-10 w-[10vw] text-white bg-orange-500 rounded-xl flex items-center justify-start">
          <button className="cursor-pointer flex gap-2 items-center" onClick={handleDangTinClick}>
            <FilePenIcon />
            <h4>Bán Xe</h4>
          </button>
        </div>
      </div>
    </div>
  );
}
