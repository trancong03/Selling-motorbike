import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMoneyBillWave,
  faMobileAlt,
  faCreditCard,
  faBarcode,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/admin-api/thuoctinhhethong/")
      .then((response) => response.json())
      .then((data) => {
        // Lấy phần tử có id lớn nhất
        const maxIdItem = data.reduce((max, item) => (item.id > max.id ? item : max), data[0]);
        setFooterData(maxIdItem);
      })
      .catch((error) => console.error("Error fetching footer data:", error));
  }, []);

  if (!footerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black text-white">
      <div className="flex flex-col sm:grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr] gap-14 text-sm ml-5 mr-2">
        <div ></div>
        
        <div className="mt-10">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-400">
            <li dangerouslySetInnerHTML={{ __html: footerData.diachifooter }} />
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="mt-10">
          <p className="text-xl font-medium mb-5">MEMBER</p>
          <ul className="flex flex-col gap-1 text-gray-400">
            <li dangerouslySetInnerHTML={{ __html: footerData.thanhvienfooter }} />
          </ul>
        </div>
        <div className="mt-10">
          <p className="text-xl font-medium mb-5">SOCIAL MEDIA</p>
          <ul className="flex flex-col gap-1 text-gray-400">
            <li dangerouslySetInnerHTML={{ __html: footerData.kenhtruyenthongfooter }} />
          </ul>
        </div>
        <div className="mt-10">
          <p className="text-xl font-medium mb-5">PAYMENT METHOD</p>
          <ul className="flex flex-col gap-1 text-gray-400">
            <li dangerouslySetInnerHTML={{ __html: footerData.phuongthucthanhtoanfooter }} />
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center">
        
      </div>
    </div>
  );
};

export default Footer;
