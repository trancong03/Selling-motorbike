import React, { useEffect, useState } from "react";
import Banner from "../Components/Header/Banner";
import axios from 'axios';
import CartItem from './../Components/ui/CartItem';
import Post from "./Post";

export default function Home() {
  const [listPost, setListPost] = useState([]);

  const fetchBaiViet = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/bai-viet/');
      console.log(response.data);
      setListPost(response.data); // Cập nhật dữ liệu vào state
    } catch (error) {
      console.error("Có lỗi xảy ra khi gọi API:", error);
    }
  };

  useEffect(() => {
    fetchBaiViet(); // Gọi hàm fetchBaiViet khi component render
  }, []); // Chạy chỉ một lần khi component mount

  
  return (
    <div className=" bg-white">
      <Banner />
      <Post/>

    </div>
  );
}
