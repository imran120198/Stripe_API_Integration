import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Styles/Home.module.css";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios("https://fakestoreapi.com/products")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCart = (product) => {
    axios
      .post(`http://localhost:8080/cart/`, product)
      .then((res) => {
        console.log(res.data);
        alert("Item Added to Cart");
        Navigate("/cart");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className={styles.heading}>Products</div>
      <div className={styles.productContainer}>
        {data.map((elem) => {
          return (
            <div key={elem.id} className={styles.productCard}>
              <img src={elem.image} alt={elem.title} />
              <p>{elem.title}</p>
              <p>Price : $ {elem.price}</p>
              <p>{elem.description.substring(0, 60)}...</p>
              <button
                onClick={() => handleCart(elem)}
                className={styles.button}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
