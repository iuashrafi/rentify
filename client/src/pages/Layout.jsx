import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "sonner";
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster richColors closeButton />
    </>
  );
};

export default Layout;
