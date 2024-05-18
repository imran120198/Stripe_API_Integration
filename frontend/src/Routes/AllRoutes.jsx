import React from "react";
import Home from "../Pages/Home";
import Cart from "../Pages/Cart";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Components/Navbar";

const AllRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
