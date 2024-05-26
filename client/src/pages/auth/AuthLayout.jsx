import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="bg-gradient-to-b from-gray-200 to-bg-white min-h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
