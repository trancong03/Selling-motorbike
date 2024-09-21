import { Heart, Search, ShoppingCart, UserCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // Adjust this value based on your header height
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

  return (
    <div className={`transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 w-full shadow-md z-50' : ''}`}>
      <div className="h-[10vh] flex items-center bg-white p-3 ">
        <div className="ml-[20vw] mr-5">
          <img
            className="h-12 sm:h-8 md:h-10 lg:h-20 w-auto"
            src="/image/logo.png"
            alt="Logo"
          />
        </div>
        <div className="hidden lg:flex items-center py-2 rounded-2xl h-[7vh] w-[40vw] bg-[#f3f3f3]">
          <input
            className="ml-2 w-[37vw] bg-transparent focus:outline-none placeholder-gray-500 text-gray-700"
            type="text"
            placeholder="Tìm sản phẩm..."
          />
          <button>
            <Search />
          </button>
        </div>
        <div className="ml-3 flex gap-4 justify-center items-center">
          <Heart />
          <ShoppingCart />
          <div className="w-[10vw] h-[8vh] bg-[#434343] rounded-3xl flex items-center justify-center text-white font-bold gap-4">
            <UserCircle />
            <h4>Đăng Nhập</h4>
          </div>
        </div>
     </div>
      <Navbar />
    </div>
  );
}
