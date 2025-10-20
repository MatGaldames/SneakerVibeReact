import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
