import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCamera } from "react-icons/fa";
import PostItem from "./PostItem";

const TrangBanXe = () => {
  const [baiDangXe, setBaiDangXe] = useState([]);

  useEffect(() => {
    const layBaiDangXe = () => {
      const baiDangXeDummy = [
        {
          id: 1,
          tieuDe: "Xe Harley-Davidson Cổ Điển",
          gia: 150000000,
          tinhTrang: "Được Bảo Dưỡng Tốt",
          moTa: "Xe Harley-Davidson cổ điển năm 1960, tình trạng tốt.",
          anh: [
            "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          ],
          chuXe: {
            ten: "Anh Bình",
            email: "AnhBinh12@gmail.com",
            soDienThoai: "0339292873"
          }
        },
        {
          id: 2,
          tieuDe: "Xe Indian Scout Được Phục Hồi",
          gia: 12000,
          tinhTrang: "Được Phục Hồi Mới",
          moTa: "Xe Indian Scout được phục hồi đẹp, tình trạng tốt.",
          anh: [
            "https://images.unsplash.com/photo-1609630875289-22852fa678ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1581575541499-6ba5539636c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          ],
          chuXe: {
            ten: "Nhan",
            email: "",
            soDienThoai: "0332327764"
          }
        },
        {
          id: 3,
          tieuDe: "Xe Triumph Bonneville Cổ Điển",
          gia: 9000,
          tinhTrang: "Cổ Điển",
          moTa: "Xe Triumph Bonneville năm 1970, tình trạng tốt.",
          anh: [
            "https://images.unsplash.com/photo-1515777315835-281b94c9589f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1512&q=80",
            "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
          ],
          chuXe: {
            ten: "Minh Hải",
            email: "minhhai@gmail.com",
            soDienThoai: "0332323443"
          }
        }
      ];
      setBaiDangXe(baiDangXeDummy);
    };

    layBaiDangXe();
  }, []);

  return (
    <div className="container mx-auto px-2 py-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Thị Trường Xe Cổ Điển</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {baiDangXe.map((baiDang) => (
          <PostItem key={baiDang.id} baiDang={baiDang} />
        ))}
      </div>
    </div>
  );
};

export default TrangBanXe;