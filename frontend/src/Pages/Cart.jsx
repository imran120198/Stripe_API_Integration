import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios("http://localhost:8080/cart")
      .then((res) => {
        console.log(res.data);
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCheckout = (price) => {
    axios
      .post(`http://localhost:8080/payment/${price}`, {
        currency: "usd",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <h1>Cart</h1>
        {cart.map((elem, index) => (
          <div key={index}>
            <img
              src={elem.image}
              alt={elem.title}
              style={{ height: "200px", width: "200px" }}
            />
            <h3>{elem.title}</h3>
            <h3>Price : Rs. {elem.price}</h3>
            <button onClick={() => handleCheckout(elem.price)}>
              Checkout {/* Checkout */}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
