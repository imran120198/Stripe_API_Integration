import React from "react";
import Home from "../Pages/Home";
import Cart from "../Pages/Cart";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Success from "../Pages/Success";
import Failure from "../Pages/Failure";

const AllRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Failure />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
