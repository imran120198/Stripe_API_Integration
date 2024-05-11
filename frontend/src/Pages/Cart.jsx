import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Styles/Cart.module.css";
import Checkout from "./Checkout";

const Cart = () => {
  const navigate = useNavigate();
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


  const handleCheckout = async () => {
    try {
      //map the products to use the stripe products IDs
      const productsForCheckout = cart.map((product) => ({
        price: product.price,
        quantity: product.quantity,
      }));
      const response = await fetch(
        "http://localhost:8080/payment/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products: productsForCheckout,
          }),
        }
      );

      const data = await response.json();
      if (data.url) {
        window.location.assign(data.url);
      }
    } catch (err) {
      console.log("Erorr during checkout: ", err);
    }
  };

  const increaseQuantity = (id) => {
    axios
      .put(`http://localhost:8080/cart/${id}/increase`)
      .then((res) => {
        const updatedCart = cart.map((item) => {
          if (item._id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        setCart(updatedCart);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const decreaseQuantity = (id) => {
    axios
      .put(`http://localhost:8080/cart/${id}/decrease`)
      .then((res) => {
        const updatedCart = cart.map((item) => {
          if (item._id === id && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
        setCart(updatedCart);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>Cart</h1>
      <div className={styles.main}>
        <div className={styles.cartContainer}>
          {cart.map((elem, index) => (
            <div key={index} className={styles.cartBox}>
              <img
                src={elem.image}
                alt={elem.title}
                style={{ height: "200px", width: "200px" }}
              />
              <h3>{elem.title}</h3>
              <h3>Price : Rs. {elem.price}</h3>
              <div className={styles.quantity}>
                <button onClick={() => increaseQuantity(elem._id)}>+</button>
                <p>{elem.quantity}</p>
                <button onClick={() => decreaseQuantity(elem._id)}>-</button>
              </div>

              <button
                onClick={() => handleCheckout(elem.price * elem.quantity)}
              >
                Checkout
              </button>
            </div>
          ))}
        </div>
        {/* <div onClick={() => handleCheckout(elem.price)}>
          <Checkout />
        </div> */}
      </div>
    </>
  );
};

export default Cart;
