import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "black",
        justifyContent: "space-between",
        height: "30px",
        minWidthwidth: "90%",
        fontSize: "20px",
        color: "white",
        padding: "20px",
      }}
    >
      <div>
        <Link to="/">Logo</Link>
      </div>
      <div>
        <Link to="/cart">Cart</Link>
      </div>
    </div>
  );
};

export default Navbar;
