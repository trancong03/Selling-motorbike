import { useState } from 'react';

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [...prevNotifications, notification]);
    console.log('Notification added:', notification); // Thêm log để kiểm tra
  };

  return { notifications, addNotification };
};

export default useNotifications;
