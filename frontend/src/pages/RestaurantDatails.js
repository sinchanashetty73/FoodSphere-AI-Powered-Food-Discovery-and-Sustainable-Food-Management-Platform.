import React from "react";
import { useParams } from "react-router-dom";
import data from "./data";
import "./RestaurantDetails.css";
import RestaurantBooking from "../pages/RestaurantBooking";
import restaurants from "../data/restorants";

import restaurantMenus from "../data/restaurantMenus";

const RestaurantDetails = () => {
  const { id } = useParams();
  const foodItems = restaurantMenus[id] || [];
  const restaurant = data.find((item) => item.id === Number(id));

  if (!restaurant) {
    return <h2 className="not-found">Restaurant not found</h2>;
  }

  return (
    <div className="restaurant-details-page">
          <div className="restaurant-banner">
          <img
    src={restaurant.img}
    alt={restaurant.name}
  />
        </div>

      <div className="restaurant-info-card">
        <div className="restaurant-header">
          <div>
            <h1>{restaurant.name}</h1>
            <p className="restaurant-categories">
              {restaurant.categories.join(" • ")}
            </p>
          </div>

          <div className="restaurant-rating-box">
            <h2>⭐ {restaurant.rating}</h2>
            <p>{restaurant.reviews.length} reviews</p>
          </div>
        </div>

        <div className="restaurant-extra-info">
          <div className="info-box">
            <h3>Distance</h3>
            <p>{restaurant.distance}</p>
          </div>

          <div className="info-box">
            <h3>Price</h3>
            <p>{restaurant.price}</p>
          </div>

          <div className="info-box">
            <h3>About</h3>
            <p>{restaurant.about}</p>
          </div>
        </div>

        <div className="reviews-section">
          <h2>Customer Reviews</h2>

          {restaurant.reviews && restaurant.reviews.length > 0 ? (
            restaurant.reviews.map((review, index) => (
              <div className="review-card" key={index}>
                <div className="review-top">
                  <h4>{review.user}</h4>
                  <span>⭐ {review.rating}</span>
                </div>
                <p>{review.comment}</p>
                
              </div>
            ))
          ) : (
            <p>No reviews yet</p>
          )}

          <RestaurantBooking />
          <div className="rest-book-button">
        
      </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default RestaurantDetails;