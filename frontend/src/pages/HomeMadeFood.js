import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./HomeMadeFood.css";
import Wishlist from "./Wishlist";


const categories = ["All", "Breakfast", "Lunch", "Dinner", "Meals", "Snacks"];

function ChangeMapView({ coords }) {
  const map = useMap();

  map.setView(coords, 15);

  return null;
}

const HomeMadeFood = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
const [selectedFood, setSelectedFood] = useState(null);

  const [homeMadeFoods, setHomeMadeFoods] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [searchValue, setSearchValue] = useState("");
   
  const [toast, setToast] = useState("");

  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
const [phone, setPhone] = useState("");
const [location, setLocation] = useState("");
const [date, setDate] = useState("");
const [paymentMethod, setPaymentMethod] = useState("UPI");

const [coordinates, setCoordinates] = useState([
  12.9716,
  77.5946,
]);

  const [activeCategory, setActiveCategory] = useState("All");

  const [cart, setCart] = useState([]);

  const [wishlist, setWishlist] = useState([]);

  const [showWishlist, setShowWishlist] = useState(false);

 const addToCart = (item) => {

  const savedCart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const updatedCart = [...savedCart, item];

  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );

  setCart(updatedCart);

  setToast(`${item.name} added to cart 🛒`);

  setTimeout(() => {
    setToast("");
  }, 2500);
};
  // wishlist functionality
 const addToWishlist = (food) => {

  const exists = wishlist.some(
    item => item.id === food.id
  );

  if (exists) {
    alert("Already in wishlist ❤️");
    return;
  }

  const updatedWishlist = [...wishlist, food];

  setWishlist(updatedWishlist);

  localStorage.setItem(
    "wishlist",
    JSON.stringify(updatedWishlist)
  );

  alert(`${food.name} added to wishlist ❤️`);
};



  const filteredFoods = homeMadeFoods.filter((food) => {

    const matchesSearch =
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||

      food.location.toLowerCase().includes(searchTerm.toLowerCase()) ||

      food.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "All" ||

      food.category.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    fetch("https://foodsphere-api.onrender.com/api/HomeMadeFoods")
        .then((res) => res.json())
        .then((data) => {
            setHomeMadeFoods(data);

            if (id) {
                const selected = data.find(
                    (food) => food.id === Number(id)
                );

                if (selected) {
                    setSelectedFood(selected);
                    setShowModal(true);
                }
            }
        });
}, [id]);

  const getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      console.log("LAT:", lat);
      console.log("LON:", lon);

      setCoordinates([lat, lon]);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );

      const data = await response.json();

      console.log(data);

      setLocation(data.display_name);
    },
    (error) => {
      console.log(error);
      alert("Location access denied");
    }
  );
};

const searchLocation = async () => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
    );

    const data = await response.json();

    console.log(data);

    if (data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);

      setCoordinates([lat, lon]);
      setLocation(data[0].display_name);
    } else {
      alert("Location not found");
    }
  } catch (error) {
    console.error(error);
  }
};
const handleHomeFoodBooking = async () => {
  try {
   const userEmail = localStorage.getItem("userEmail");

console.log("Stored Email:", userEmail);

if (!userEmail) {
  alert("Please login first");
  return;
} 
    const bookingData = {
      foodItemId: selectedFood.id,
      foodName: selectedFood.name,
      price: selectedFood.price,
      quantity,
      phoneNumber: phone,
      pickupLocation: location,
      paymentMethod,
      totalAmount: selectedFood.price * quantity,
     userEmail: localStorage.getItem("userEmail"),
    };

    const response = await fetch(
      "https://foodsphere-api.onrender.com/api/DealBooking",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      }
    );

    const result = await response.text();

    console.log("Status:", response.status);
    console.log("Response:", result);

    if (response.ok) {
      alert("Order Placed Successfully!");
    } else {
      alert("Booking Failed" + result);
    }
  } catch (error) {
    console.error(error);
    alert("Error while booking");
  }
};


  return (
    <div className="homemade-page">

      <div className="homemade-hero">

        <div className="overlay">

          <h1>Home Made Food Items</h1>

          <p>
            Freshly prepared homemade meals, snacks, and breakfast items near you
          </p>

          <div className="hero-search">

            <input
              type="text"
              placeholder="Search for restaurants, food items, or locations"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />

            <button
              onClick={() => setSearchTerm(searchValue)}
            >
              Search
            </button>

          </div>

        </div>

      </div>

      <div className="category-buttons">

        {categories.map((category) => (

          <button
            key={category}
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>

          

        ))}
</div>   
{/* // category-buttons closindiv */}

<div className="top-buttons">

  {/* <button
    className="top-btn"
    onClick={() => navigate("/cart")}
  >
    Go To Cart 🛒
  </button> */}

  <button
className="top-btn"
onClick={()=>setShowWishlist(true)}
>
Wishlist ❤️
</button>

</div>

     <div className="food-grid">
  {filteredFoods.map((food) => (
    <div className="food-card" key={food.id}>

      <div className="food-image-wrapper">

        <button
          className="wishlist-btn"
          onClick={() => addToWishlist(food)}
        >
          ❤️
        </button>

        <img
          src={`https://foodsphere-api.onrender.com${food.imageUrl}`}
          alt={food.name}
          className="homemade-food-image"
        />

      </div>

      <div className="food-contents">

        <h3>{food.name}</h3>

        <p className="food-description">
          {food.description}
        </p>

        <div className="food-details">

          <span>👩‍🍳 {food.seller}</span>

          <span>⭐ {food.rating}</span>

          <span>📍 {food.location}</span>

        </div>

        <div className="food-price-row">

          <div className="price-box">

            <span className="price">
              ₹{food.price}
            </span>

            <span className="original-price">
              ₹{food.originalPrice}
            </span>

          </div>

          {/* <button
            className="cart-btn"
            onClick={() => addToCart(food)}
          >
            Add To Cart
          </button> */}

        <button
  className="order-btn"
  onClick={() => {
    setSelectedFood(food);
    setShowModal(true);
  }}
>
  Order Now
</button>

        </div>

      </div>

    </div>
  ))}
</div>
{showModal && selectedFood && (
  <div className="booking-overlay">
    <div className="booking-modal">

      <button
        className="close-btn"
        onClick={() => setShowModal(false)}
      >
        ✖
      </button>

      <div className="booking-grid">

        {/* LEFT SIDE */}

        <div className="booking-left">

         <img
  src={`https://foodsphere-api.onrender.com${selectedFood.imageUrl}`}
  alt={selectedFood.name}
  className="booking-image"
/>

          <h2>{selectedFood.name}</h2>

          <p>
            <strong>Home Chef:</strong>{" "}
            {selectedFood.seller}
          </p>

          <p>
            <strong>Price:</strong> ₹{selectedFood.price}
          </p>

          <p>
            <strong>Rating:</strong> ⭐ {selectedFood.rating}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {selectedFood.location}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {selectedFood.description}
          </p>
          <label>Quantity</label>
<select
  value={quantity}
  onChange={(e) =>
    setQuantity(Number(e.target.value))
  }
>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
</select>

<label>Date</label>
<input
  type="date"
  value={date}
  onChange={(e) =>
    setDate(e.target.value)
  }
/>

<label>Phone Number</label>

<input
  type="text"
  placeholder="Enter phone number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>

<label>Pickup Location</label>

<button
  className="location-btn"
  onClick={getCurrentLocation}
>
  📍 Use Current Location
</button>

<input
  type="text"
  placeholder="Search location"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
/>
<button
  className="search-location-btn"
  onClick={searchLocation}
>
  🔍 Search Location
</button>

<div className="map-container">
  <MapContainer
  center={coordinates}
  zoom={13}
  style={{ height: "300px", width: "100%" }}
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  <ChangeMapView coords={coordinates} />

  <Marker position={coordinates}>
    <Popup>Selected Location</Popup>
  </Marker>
</MapContainer>
</div>

<label>Payment Method</label>

<select
  value={paymentMethod}
  onChange={(e) =>
    setPaymentMethod(e.target.value)
  }
>
  <option>UPI</option>
  <option>Credit Card</option>
  <option>Debit Card</option>
  <option>Cash On Pickup</option>
</select>

        </div>

        {/* RIGHT SIDE */}

        <div className="booking-right">

  

          

          <div className="total-price">
  Total: ₹{selectedFood.price * quantity}
</div>

<button
  className="pay-btn"
  onClick={handleHomeFoodBooking}
>
  Pay Now
</button>

        </div>

      </div>

    </div>
  </div>
  
)}


{showWishlist && (
  <Wishlist
    onClose={() => setShowWishlist(false)}
    addToCart={addToCart}
  />
)}

{toast && (
  <div className="toast-message">
    {toast}
  </div>
)}
    </div>

    
  );
  
};

export default HomeMadeFood;