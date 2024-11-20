import { BellRing, FilePenIcon, Heart, HomeIcon, LogOut, NotebookText, Search, SettingsIcon, ShoppingCart, UserCircle } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

export default function Header({ onLoginClick, userInfo, setUserInfo,  }) {
  const [isSticky, setIsSticky] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    if ( userInfo == null || !userInfo){
      onLoginClick();
    }
    else{
      navigate('/account');
    }
  };
  const handleDangTinClick = () => {
    if (userInfo == null || !userInfo) {
      onLoginClick();
    }
    else {
      navigate('/new-post');
    }
  };
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsMenuOpen(false);
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
  const handleAuthClick = () => {
    if (userInfo!=null||userInfo) {
      setUserInfo(null);
      localStorage.removeItem('userInfo'); 
      navigate('/');
    }
    if (userInfo == null ) {
      onLoginClick();
    }
    setIsMenuOpen(false); // Đóng menu
  };
console.log(userInfo);

  return (
    <div className={`transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 w-full shadow-md z-50' : ''}`}>
      <div className=" h-20 flex items-center bg-yellow-300 p-3 ">
        <div className=" mr-5">
          <img
            className="h-16  w-40"
            src="http://127.0.0.1:8000//media/images/logo.png"
            alt="Logo"
          />
        </div>
        <div className="hidden lg:flex items-center justify-between py-2 rounded-xl h-[5vh] w-[30vw] bg-[#f3f3f3]">
          <input
            className="ml-2 w-[20vw] bg-transparent focus:outline-none placeholder-gray-500 text-gray-700"
            type="text"
            placeholder="Tìm sản phẩm..."
          />
          
          <button>
            <Search />
          </button>
        </div>
        <div className="ml-3 flex gap-4 justify-center items-center">
          <a
            href="#"
            onClick={() => setActiveLink("heart")}
            className={`text-[#5b5858cc]  flex gap-2 items-center  font-arial  px-3 py-2 ${activeLink === "heart"
              ? "text-black font-bold"
              : "hover:text-black"
              }`}
          >
            <Heart />
          </a>
          <a
            href="#"
            onClick={() => setActiveLink("BellRing")}
            className={`text-[#5b5858cc]  flex gap-2 items-center  font-arial  px-3 py-2 ${activeLink === "BellRing"
              ? "text-black font-bold"
              : "hover:text-black"
              }`}
          >
            <BellRing />
          </a>
        
          <div className="flex space-x-4 mb-2 h-10 gap-8 justify-start">
          </div>
        </div>
        <div className="px-3 py-2 h-10 w-[12vw] bg-transparent rounded-3xl flex items-center justify-start  ">
          <a
            href="/"
            onClick={() => setActiveLink("home")}
            className={`text-[#5b5858cc]  flex gap-2 items-center  font-arial  px-3 py-2 ${activeLink === "home"
              ? "text-black font-bold"
              : "hover:text-black"
              }`}
          >
            <HomeIcon/>
            Trang Chủ
          </a>
        </div>
        <div className="px-3 py-2 h-10 w-[12vw] bg-transparent rounded-3xl flex items-center justify-start  ">
          <a
            href="#"
            onClick={() => setActiveLink("qltin")}
            className={`text-[#5b5858cc]  flex gap-2 items-center  font-arial  px-3 py-2 ${activeLink === "qltin"
              ? "text-black font-bold"
              : "hover:text-black "
              }`}
          >
            <NotebookText />
            Quản lý tin
          </a>
        </div>
        <div className="px-3 py-2 h-10 w-[10vw] bg-transparent rounded-3xl flex items-center justify-start  ">
          <a
            href="#"
            onClick={() => setActiveLink("aboutus")}
            className={`text-[#5b5858cc]  flex gap-2 items-center font-arial  px-3 py-2 ${activeLink === "aboutus"
              ? "text-black font-bold"
              : "hover:text-black"
              }`}
          >
            Giới Thiệu
          </a>

        </div>
        <div className="px-3 py-2 h-10 w-[20vw] bg-transparent rounded-3xl flex items-center justify-start relative ">
          <nav className="relative">
            <a
              href="#"
              onClick={() => {
                setActiveLink("dn");
                setIsMenuOpen(!isMenuOpen); 
              }}
              className={`text-[#5b5858cc] flex gap-2 items-center font-arial px-3 py-2 ${activeLink === "dn"
                ? "text-black font-bold"
                : "hover:text-black"
                }`}
            >
            
              <img
                src={userInfo && userInfo.anhdaidien ? `http://127.0.0.1:8000//media/images/${userInfo.anhdaidien}` : "http://127.0.0.1:8000//media/images/icon.png"}
                alt="User anhdaidien"
                className="w-12 h-12 rounded-full"
              />
              {userInfo?.hoten || "Tài khoản"}
            </a>

            {/* Menu con bên dưới */}
            {isMenuOpen && (
              <div 
                ref={menuRef}
              className="absolute top-[8.5vh] mt-2 bg-white border rounded shadow-md  w-48 z-50">
                <ul>
                  <li className="py-2 px-3 hover:bg-gray-100">
                    <button className="w-full text-left flex items-center gap-2" onClick={handleSettingsClick}>
                      <SettingsIcon/>
                      Cài đặt
                    </button>
                  </li>
                  <li className="py-2 px-3 hover:bg-gray-100">
                    <button className="w-full text-left flex items-center gap-2" onClick={handleAuthClick}>
                      <LogOut/>
                      {userInfo == null || !userInfo.hoten ? "Login" : "Logout"}
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </div>
        <div className="px-3 py-2 h-10 w-[10vw] text-white bg-orange-500 rounded-xl flex items-center justify-start  ">
          <button className="cursor-pointer flex gap-2 items-center" onClick={handleDangTinClick}>
            <FilePenIcon />
            <h4>Bán Xe</h4>
          </button>
        </div>
     </div>
      
    </div>
  );
}
