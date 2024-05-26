import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from "sonner";
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster richColors closeButton />
    </>
  );
};

export default Layout;
