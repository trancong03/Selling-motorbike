import React from "react";
import "./App.css";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import ErrorPage from "./Components/ErrorPage";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import DN from './Components/DN';
import Home from "./Pages/Home";
function App() {
  return (
    <>
    <div className="">
        <Header className="fixed top-0 left-0 w-full bg-white shadow-md z-50" />
    </div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/Dang-Nhap" element={<DN />} />
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
