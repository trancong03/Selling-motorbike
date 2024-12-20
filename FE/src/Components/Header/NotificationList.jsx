import { BellRing } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

export default function Header({ onLoginClick, userInfo, setUserInfo }) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationsRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: "Bài viết sắp hết hạn",
      content: "Bài viết 'Xe SH 2022' sẽ hết hạn vào ngày 20/12/2024.",
      time: "1 giờ trước",
    },
    {
      id: 2,
      title: "Nạp tiền thành công",
      content: "Bạn đã nạp thành công 500.000 VNĐ vào tài khoản.",
      time: "Hôm qua",
    },
  ];

  // Đóng menu thông báo khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        className="text-[#5b5858cc] flex items-center gap-2 font-arial px-3 py-2 hover:text-black"
        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
      >
        <BellRing />
        Thông báo
      </button>

      {isNotificationOpen && (
        <div
          ref={notificationsRef}
          className="absolute top-10 right-0 w-80 bg-white shadow-md rounded-lg z-50 p-4"
        >
          <h3 className="text-lg font-semibold mb-2">Danh sách thông báo</h3>
          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
                  <p className="text-gray-600 text-xs">{notification.content}</p>
                  <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Không có thông báo nào.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
