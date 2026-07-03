import React, { useState,useEffect } from "react";
import { requestNotificationPermission } from "../notification";

import { MapContainer, TileLayer, Marker, Popup,useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate,useParams } from "react-router-dom";

import "./NightDeals.css";


const categories = ["All","Meals", "Bakery",  "Beverages", "Desserts"];

function NightDeal() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [deals, setDeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDeal, setSelectedDeal] = useState(null);
const [showModal, setShowModal] = useState(false);
const [quantity, setQuantity] = useState(1);
const [phone, setPhone] = useState("");
const [date, setDate] = useState("");
const [paymentMethod, setPaymentMethod] = useState("UPI");

const navigate = useNavigate();
const { id } = useParams();

const [location, setLocation] = useState("");
const [coordinates, setCoordinates] = useState([12.9716, 77.5946]); // Bengaluru default


 useEffect(() => {

  const loadDeals = async () => {

    try {

      const oldRes = await fetch("http://localhost:5194/api/Food/nightdeals");
      const newRes = await fetch("http://localhost:5194/api/NightDeals");

      const oldDeals = oldRes.ok ? await oldRes.json() : [];
      const newDeals = newRes.ok ? await newRes.json() : [];

      const formattedOldDeals = oldDeals.map(d => ({
        id: d.id,
        foodName: d.name,
        restaurantName: d.restaurant,
        imageUrl: d.imageUrl,
        originalPrice: d.originalPrice,
        discountedPrice: d.discountedPrice,
        quantity: d.quantity,
        category: d.category,
        pickupTime: d.pickupTime
      }));

      const formattedNewDeals = newDeals.map(d => ({
        id: d.id + 10000,
        foodName: d.foodName,
        restaurantName: d.restaurantName,
        imageUrl: d.imageUrl,
        originalPrice: d.originalPrice,
        discountedPrice: d.discountPrice,
        quantity: d.quantity,
        category: d.category,
        pickupTime: d.startTime
      }));

      const allDeals = [
        ...formattedOldDeals,
        ...formattedNewDeals
      ];

      setDeals(allDeals);

      if (id) {

        const selected = allDeals.find(
          x => x.id === Number(id)
        );

        if (selected) {
          setSelectedDeal(selected);
          setShowModal(true);
        }

      }

    }
    catch (err) {
      console.log(err);
    }

  };

  loadDeals();

}, [id]);
  
  const getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      setCoordinates([lat, lon]);
      console.log("Latitude:", lat);
console.log("Longitude:", lon);

      try {
        const response = await fetch(
  `https://nominatim.openstreetmap.org/reverse?format=json&accept-language=en&lat=${lat}&lon=${lon}`
);

        const data = await response.json();

        setLocation(data.display_name);
      } catch (error) {
        console.error(error);
      }
    },
    (error) => {
      alert("Unable to get location");
    }
  );
};
// locations
const searchLocation = async () => {
  if (!location.trim()) {
    alert("Enter a location");
    return;
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}&limit=1`
    );

    const data = await response.json();

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
    alert("Error searching location");
  }
};
  const filteredDeals = deals.filter((deal) => {
  const matchesCategory =
    selectedCategory === "All" ||
    deal.category === selectedCategory;

  const matchesSearch =
    deal.foodName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.restaurantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.category?.toLowerCase().includes(searchTerm.toLowerCase());

  return matchesCategory && matchesSearch;
});

        const bookDeal = async (deal) => {
  try {
    const response = await fetch(
      "http://localhost:5194/api/DealBooking",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodItemId: deal.id,
          foodName: deal.foodName,
          price: deal.discountedPrice,
          userEmail: "user@gmail.com"
        }),
      }
    );
    console.log(deals);

    const data = await response.json();

    if (response.ok) {
      alert("Deal Reserved Successfully!");
    } else {
      alert(data.message || "Booking Failed");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};
function ChangeMapView({ center }) {
  const map = useMap();

  map.setView(center, 13);

  return null;
}
const handlePayNow = async () => {
  try {
    if (!phone) {
      alert("Please enter phone number");
      return;
    }

    if (!date) {
      alert("Please select a date");
      return;
    }

    if (!location) {
      alert("Please select pickup location");
      return;
    }

    const bookingData = {
      foodItemId: selectedDeal.id,
      foodName: selectedDeal.foodName,
      price: selectedDeal.discountedPrice,
     userEmail: localStorage.getItem("userEmail"),

      bookingDate: new Date(date),

      phoneNumber: phone,
      pickupLocation: location,
      quantity: quantity,
      paymentMethod: paymentMethod,

      totalAmount:
        selectedDeal.discountedPrice * quantity,

      status: "Pending"
    };
    console.log("Booking Data:", bookingData);

    const response = await fetch(
      "http://localhost:5194/api/DealBooking",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
      }
    );

    const result = await response.text();

    console.log("Status:", response.status);
    console.log("Response:", result);

    if (response.ok) {
      alert("🎉 Deal Reserved Successfully!");

      setShowModal(false);

      setQuantity(1);
      setPhone("");
      setDate("");
      setLocation("");
    } else {
      alert(`Booking Failed: ${result}`);
    }

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay">
          <h1>Save Food, Save Money</h1>
          <p>
            Discover delicious leftover food deals from nearby restaurants at
            discounted prices. Reduce food waste while enjoying affordable meals.
          </p>

          <div className="search-box">
           <input
  type="text"
  placeholder="Search for restaurants, food items, or locations"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
            <button onClick={() => console.log("Searching...")}>
  Search
</button>
            {/* <button
  onClick={() =>
    new Notification("FoodSphere AI", {
      body: "🍕 New Night Deal Available!",
    })
  }
>
  Test Notification
</button> */}
{/* <button onClick={sendNotification}>
  Send FCM Notification
</button> */}
          </div>
        </div>
      </section>

      <section className="categories-section">
        <h2>Categories</h2>
        <div className="categories">
  {categories.map((category, index) => (
    <button
      key={index}
      className={`category-btn ${selectedCategory === category ? "active" : ""}`}
      onClick={() => setSelectedCategory(category)}
    >
      {category}
    </button>
  ))}
</div>
      </section>

      <section className="featured-section">
        <h2>Today’s Best Leftover Food Deals</h2>
        <div className="deals-container">
          {filteredDeals.map((deal) =>  (
            <div className="deal-card" key={deal.id}>
            <img
  src={deal.imageUrl}
  alt={deal.foodName}
  className="deal-image"
/>

        <p className="item-name">{deal.foodName}</p>

        <p className="item-time">Pickup Time: {deal.pickupTime}</p>
              <div className="deal-content">
                <h3>{deal.restaurantName}</h3>
                <p className="item-name">{deal.item}</p>
                <p className="price">
                  ₹{deal.originalPrice} <span className="arrow">→</span>{" "}
                  <span>₹{deal.discountedPrice}</span>
                </p>
                {/* <p>Pickup : {deal.pickup}</p> */}
                <p>Only {deal.quantity} left</p>
               <button
  className="order-btn"
  onClick={() => {
    setSelectedDeal(deal);
    setShowModal(true);
  }}
>
  Order Now
</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step-card">
            <h3>1</h3>
            <p>Browse leftover food deals from nearby restaurants</p>
          </div>
          <div className="step-card">
            <h3>2</h3>
            <p>Choose your favorite deal at a discounted price</p>
          </div>
          <div className="step-card">
            <h3>3</h3>
            <p>Order and pick it up within the mentioned time</p>
          </div>
          <div className="step-card">
            <h3>4</h3>
            <p>Enjoy affordable food while helping reduce waste</p>
          </div>
        </div>
      </section>

      <section className="why-choose-us">
        <h2>Why Choose Us</h2>
        <div className="why-grid">
          <div className="why-card">Affordable food deals</div>
          <div className="why-card">Reduce food wastage</div>
          <div className="why-card">Support local restaurants</div>
          <div className="why-card">Easy ordering and pickup</div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Start Saving Today</h2>
        <p>
          Find the best leftover food deals near you and make a positive impact.
        </p>
        <button className="cta-btn">Explore Deals</button>
      </section>
      {showModal && selectedDeal && (
  <div className="booking-overlay">

    <div className="booking-modal">

      <span
        className="close-btn"
        onClick={() => setShowModal(false)}
      >
        ×
      </span>

      <div className="booking-layout">

        {/* LEFT SIDE */}
        <div className="booking-left">

          <img
            src={selectedDeal.imageUrl}
            alt={selectedDeal.foodName}
            className="booking-image"
          />

          <h2>{selectedDeal.foodName}</h2>

          <p>
            <strong>Restaurant:</strong>{" "}
            {selectedDeal.restaurantName}
          </p>

          <p>
            <strong>Price:</strong> ₹
            {selectedDeal.discountedPrice}
          </p>

          <p>
            <strong>Pickup Time:</strong>{" "}
            {selectedDeal.pickupTime}
          </p>

          <p>
            <strong>Available:</strong>{" "}
            {selectedDeal.quantity} left
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="booking-right">

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
            value={phone}
            placeholder="Enter phone number"
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <div className="location-section">
  <label>Pickup Location</label>

  <button
    type="button"
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
    type="button"
    className="search-location-btn"
    onClick={searchLocation}
  >
    🔍 Search Location
  </button>
</div>
          <div className="map-box">
            <MapContainer
  center={coordinates}
  zoom={13}
  style={{ height: "180px", width: "100%" }}
>
  <ChangeMapView center={coordinates} />

  <TileLayer
    attribution="&copy; OpenStreetMap contributors"
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

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

          <p className="total-price">
            Total: ₹
            {selectedDeal.discountedPrice * quantity}
          </p>

         <button
  className="pay-btn"
  onClick={handlePayNow}
>
  Pay Now
</button>

        </div>
      </div>

    </div>

  </div>
)}
    </div>
  );
}

export default NightDeal;