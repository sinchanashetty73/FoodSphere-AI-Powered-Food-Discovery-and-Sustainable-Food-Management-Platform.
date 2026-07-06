import React, { useState, useEffect } from "react";
import "./Wishlist.css";

const Wishlist  = ({ onClose, addToCart }) => {

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const items =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(items);
  }, []);

  const removeItem = (id) => {

    const updated =
      wishlist.filter((item) => item.id !== id);

    setWishlist(updated);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );
  };

  return (

    <div className="wishlist-overlay">

      <div className="wishlist-modal">

        {/* Header */}

        <div className="wishlist-header">

          <h2>
            ❤️ My Wishlist
          </h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✖
          </button>

        </div>

        {/* Empty Wishlist */}

        {wishlist.length === 0 ? (

          <div className="wishlist-empty">

            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt=""
            />

            <h3>
              Your Wishlist is Empty
            </h3>

            <p>
              Save your favourite foods here ❤️
            </p>

          </div>

        ) : (

          <>
            {wishlist.map((food) => (

              <div
                className="wishlist-card"
                key={food.id}
              >

                <img
                  src={`https://foodsphere-api.onrender.com${food.imageUrl}`}
                  alt={food.name}
                />

                <div className="wishlist-info">

                  <h3>{food.name}</h3>

                  <p>
                    👨‍🍳 {food.seller}
                  </p>

                  <div className="wishlist-rating">

                    ⭐ {food.rating}

                  </div>

                </div>

                <div className="wishlist-right">

                  <h2>
                    ₹{food.price}
                  </h2>

                  <div className="wishlist-buttons">

                    <button
                      className="cart-btn"
                      onClick={() => {

  addToCart(food);

  const updated = wishlist.filter(
    item => item.id !== food.id
  );

  setWishlist(updated);

  localStorage.setItem(
    "wishlist",
    JSON.stringify(updated)
  );

}}
                    >
                      🛒 Add To Cart
                    </button>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeItem(food.id)
                      }
                    >
                      🗑 Remove
                    </button>

                  </div>

                </div>

              </div>

            ))}

            <div className="wishlist-footer">

              <h3>
                Total Items : {wishlist.length}
              </h3>

            </div>

          </>

        )}

      </div>

    </div>

  );
};

export default Wishlist;