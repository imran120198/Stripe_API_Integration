import React from "react";
import styles from "../Styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <div>
        <Link to="/">E-Commerce App</Link>
      </div>
      <div>
        <Link to="/cart">
          <BsCart4 size={40} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
