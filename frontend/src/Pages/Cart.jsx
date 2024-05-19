import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log("cart:", cart);

  const handleCheckout = async () => {
    const stripe = await loadStripe(
      "pk_test_51P9LHQSHUXsAisoHrb3fLOLsGQaUN82V8zW1fK43hXZnoT318A6Wbg25xllNdDSARhRrC6d8kveikbgubsBFuCSs00heTH7eSE"
    );

    const body = {
      products: cart,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch("http://localhost:8080/checkout", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <div>
      <div>
        <h1>Carts</h1>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
        }}
      >
        {cart.map((elem) => {
          return (
            <div
              key={elem.id}
              style={{ border: "1px solid black", padding: "10px" }}
            >
              <img
                src={elem.image}
                alt="product"
                width={"200px"}
                height={"200px"}
              />
              <h3>{elem.title}</h3>
              <h3>{elem.price}</h3>
            </div>
          );
        })}
      </div>
      <div>
        <button
          style={{
            width: "150px",
            height: "30px",
            fontWeight: "700",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
