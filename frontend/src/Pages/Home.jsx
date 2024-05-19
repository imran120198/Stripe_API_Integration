import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios("https://fakestoreapi.com/products")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));

    // Load cart from local storage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (item) => {
    const newCart = [...cart, item];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <>
      <div>
        <h1>Product</h1>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
        }}
      >
        {data.map((elem) => {
          return (
            <div
              key={elem.id}
              style={{ border: "1px solid black", padding: "10px" }}
            >
              <img
                src={elem.image}
                width={"200px"}
                height={"200px"}
                alt="product"
              />
              <h3>{elem.title}</h3>
              <h3>{elem.price}</h3>
              <h3>
                <button onClick={() => addToCart(elem)}>Add to Cart</button>
              </h3>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
