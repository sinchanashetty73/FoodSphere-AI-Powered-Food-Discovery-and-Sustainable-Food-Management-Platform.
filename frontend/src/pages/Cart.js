import React from "react";

const Cart = () => {

  const cartItems =
    JSON.parse(localStorage.getItem("cart")) || [];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (

    <div style={{ padding: "40px" }}>

      <h1>Your Cart</h1>

      {cartItems.map((item, index) => (

        <div key={index}>

          <h3>{item.name}</h3>

          <p>₹{item.price}</p>

        </div>
      ))}

      <h2>Total: ₹{total}</h2>

    </div>
  );
};

export default Cart;