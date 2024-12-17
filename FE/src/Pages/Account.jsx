import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes và Route
import NavigationAccount from "../Components/userUI/navigationAccount"; // Navigation component
import ResetPassWord from "../Components/userUI/ResetPassWord"; // Reset password component
import InfomationAccount from "../Components/userUI/InfomationAccount"; // Information account component
import PostOfUser from "../Components/userUI/PostOfUser";
import ProductLike from "./ProductLike";
import ErrorBoundary from "../ErrorBoundary";

export default function Account({ user, setUserInfo }) {
  return (
    <div className="mx-auto w-full bg-white shadow-lg rounded-md flex justify-between items-start gap-4 h-auto">
      {/* Khối NavigationAccount ở bên phải */}
      <NavigationAccount user={user} setUserInfo={setUserInfo} />

      {/* Khối hiển thị nội dung */}
      <div className="flex-1 p-4">
        <Routes>
          {/* Route mặc định cho InfomationAccount */}
          <Route path="/" element={<InfomationAccount user={user} setUserInfo={setUserInfo} />} />
          {/* Route cho ResetPassWord */}
          <Route path="like-product" element={<ErrorBoundary><ProductLike /></ErrorBoundary>} />
          <Route path="reset-password" element={<ResetPassWord user={user} />} />
          <Route path="user-post/" element={<PostOfUser userId={user} />} />
        </Routes>
      </div>
    </div>
  );
}
