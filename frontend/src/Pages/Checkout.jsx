import axios from "axios";
import React, { useEffect, useState } from "react";

const Checkout = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios("http://localhost:8080/cart")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("products",products)

  const checkout = async () => {
    try {
      const productsForCheckout = products.map((product) => ({
        price : product.price,
        quantity: product.quantity,
      }));
      const response = await fetch("http://localhost:8080/payment/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: productsForCheckout,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.assign(data.url);
      }
    } catch (err) {
      console.log("Erorr during checkout: ", err);
    }
  };

  let totalItems = 0;
  let shipping = 25.0;
  let subTotal = 0;
  //updating items price
  products.map((item) => (subTotal += item.price * item.quantity));
  //updating total number of items
  products.map((item) => (totalItems += item.quantity));

  return (
    <div className="col-md-4 border">
      <div className="card">
        <div className="card-header">
          <h3>Checkout</h3>
        </div>
        <div className="card-body">
          <div className="list-group list-group-flush">
            <h3 className="list-group-item d-flex justify-content-between border-0">
              Products<span>: ${subTotal.toFixed(2)}</span>
            </h3>
            <h3 className="list-group-item d-flex justify-content-between border-0">
              Shipping <span>: ${shipping}</span>
            </h3>
            <h3 className="list-group-item d-flex justify-content-between border-0 fw-bold mb-5">
              Total <span>: ${(subTotal + shipping).toFixed(2)}</span>
            </h3>
          </div>
          <button
            className="btn btn-dark"
            onClick={() => {
              checkout();
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
