import React from "react";
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
  return (
    <div className="bg-black text-white">
      <div className="flex flex-col sm:grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-14 my-20 mt-40 text-sm ml-5 mr-2">
        <div className="mt-10">
          <img
            src="https://theciu.vn/img/logo-white.png"
            alt=""
            className="mb-5 w-32"
          />
          <p className="w-full md:w-2/3 text-gray-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad maxime,
            voluptas non aspernatur omnis facere asperiores. Optio voluptatum
            autem, sint, dolore inventore adipisci praesentium explicabo
            distinctio libero, repellendus laboriosam fugit?
          </p>
        </div>
        <div className="mt-10">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-400">
            <li>Địa Chỉ : 140 Lê Trọng Tấn</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="mt-10">
          <p className="text-xl font-medium mb-5">MEMBER</p>
          <ul className="flex flex-col gap-1 text-gray-400">
            <li>Trần Chí Công</li>
            <li>Phạm Hồ Đăng Huy</li>
            <li>Nguyễn Thị Hằng</li>
          </ul>
        </div>
        <div className="mt-10">
          <p className="text-xl font-medium mb-5">SOCIAL MEDIA</p>
          <ul className="flex flex-col gap-1 text-gray-400">
            <li>
              <FontAwesomeIcon icon={faFacebook} className="mr-2" />
              Facebook
            </li>
            <li>
              <FontAwesomeIcon icon={faInstagram} className="mr-2" />
              Instagram
            </li>
            <li>
              <FontAwesomeIcon icon={faTiktok} className="mr-2" />
              Tiktok
            </li>
          </ul>
        </div>
        <div className="mt-10">
          <p className="text-xl font-medium mb-5">PAYMENT METHOD</p>
          <ul className="flex flex-col gap-1 text-gray-400">
            <li>
              <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
              Thanh toán khi nhận hàng
            </li>
            <li>
              <FontAwesomeIcon icon={faMobileAlt} className="mr-2" />
              Ví MoMo
            </li>
            <li>
              <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
              Thanh toán bằng thẻ ATM
            </li>
            <li>
              <FontAwesomeIcon icon={faBarcode} className="mr-2" />
              VNPay
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <img
          src="https://theciu.vn/img/logo-white.png"
          alt=""
          className="h-12 sm:h-8 md:h-10 lg:h-16 w-auto"
        />
        <hr className="border-gray-600 w-full" />
        <p className="py-5 text-sm text-center text-gray-400">
          Copyright2024@ theciu.vn - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
