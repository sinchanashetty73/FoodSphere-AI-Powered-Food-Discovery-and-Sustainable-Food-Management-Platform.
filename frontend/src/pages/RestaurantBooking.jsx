import React, { useState, useEffect } from "react";
import "./RestaurantBooking.css";
import { useParams } from "react-router-dom";
import axios from "axios";
// import restaurantMenus from "../data/restaurantMenus";
import jsPDF from "jspdf";

const tables = [
  { id: 1, seats: 2, available: true },
  { id: 2, seats: 2, available: false },
  { id: 3, seats: 4, available: true },
  { id: 4, seats: 4, available: true },
  { id: 5, seats: 2, available: false },
  { id: 6, seats: 6, available: true },
  { id: 7, seats: 4, available: true },
  { id: 8, seats: 2, available: true },
];



function RestaurantBooking() {
    const { id } = useParams();

// const foodItems = restaurantMenus[id] || [];

const [showPaymentOptions, setShowPaymentOptions] =
  useState(false);

  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedFood, setSelectedFood] = useState([]);
  const [selectedTime, setSelectedTime] = useState("1:00 PM");

  // booking details
  const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [date, setDate] = useState("");
const [showReceipt, setShowReceipt] = useState(false);

const [foods, setFoods] = useState([]);


useEffect(() => {
  fetch(`http://localhost:5194/api/fooditems/restaurant/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setFoods(data);
    })
    .catch((err) => console.log(err));
}, [id]);
// dowload receipt 
const downloadReceipt = () => {

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("FoodSphere Receipt", 20, 20);

  doc.setFontSize(12);

  doc.text(`Name: ${name}`, 20, 40);
  doc.text(`Phone: ${phone}`, 20, 50);
  doc.text(`Date: ${date}`, 20, 60);
  doc.text(`Time: ${selectedTime}`, 20, 70);
  doc.text(`Table: T${selectedTable}`, 20, 80);

  let y = 100;

  doc.text("Ordered Foods:", 20, y);

  selectedFood.forEach((item) => {
    y += 10;
    doc.text(`${item.name} - ₹${item.price}`, 20, y);
  });

  y += 20;

  doc.text(`Total Amount: ₹${total}`, 20, y);

  doc.save("FoodSphere-Receipt.pdf");
};

  const toggleFood = (item) => {
    const exists = selectedFood.find((f) => f.id === item.id);

    if (exists) {
      setSelectedFood(selectedFood.filter((f) => f.id !== item.id));
    } else {
      setSelectedFood([...selectedFood, item]);
    }
  };

  const total = selectedFood.reduce((acc, item) => acc + item.price, 0);

  // pay function
  const handlePayment = () => {

  const options = {
    key: "rzp_test_YourKeyHere",

    amount: total * 100,

    currency: "INR",

    name: "FoodSphere",

    description: "Restaurant Reservation Payment",

    handler: function (response) {
      saveBooking("Online Payment");
      alert(
        "Payment Successful!\nPayment ID: " +
        response.razorpay_payment_id
      );

    },

    prefill: {
      name: name,
      contact: phone,
    },

    theme: {
      color: "#3b1707",
    },
  };

  const razor = new window.Razorpay(options);

  razor.open();
};

const validateBooking = () => {

  if (!name || !phone || !date) {

    alert("Please fill all booking details");

    return false;
  }

  if (!selectedTable) {

    alert("Please select a table");

    return false;
  }

  if (selectedFood.length === 0) {

    alert("Please select at least one food item");

    return false;
  }

  return true;
};

const openRazorpay = () => {

  const options = {

    key: "rzp_test_YourTestKeyHere",

    amount: total * 100,

    currency: "INR",

    name: "FoodSphere",

    description: "Restaurant Booking Payment",

    handler: function (response) {

      alert(
        "Payment Successful!\nPayment ID: " +
        response.razorpay_payment_id
      );
     saveBooking("Online Payment");
      downloadReceipt();
    },

    prefill: {
      name: name,
      contact: phone,
    },

    theme: {
      color: "#5c1d0c",
    },
  };

  const rzp = new window.Razorpay(options);

  rzp.open();
};


const handleCashPayment = () => {

  alert(
    "Reservation Confirmed! Please pay at the restaurant."
  );
  saveBooking("Pay at Restaurant");
  downloadReceipt();
};
const saveBooking = async (paymentMethod) => {

  try {

    const bookingData = {

      customerName: name,
      phoneNumber: phone,
      bookingDate: date,
      bookingTime: selectedTime,
      tableNumber: `T${selectedTable}`,
      totalAmount: total,
      paymentMethod: paymentMethod,
    };

    await axios.post(
      "http://localhost:5194/api/bookings",
      bookingData
    );

  } catch (error) {

    console.log(error);
  }
};

  return (
    <div className="booking-container">

      {/* HEADER */}
      <div className="booking-header">
        <div>
          <h1>Reserve Your Evening</h1>
          <p>
            Choose your table, pick a time and pre-order your favourites.
          </p>
        </div>

        <button className="reserve-btn">
          Book a Table
        </button>
      </div>

      {/* TABLES */}
      <h2>Select a Table</h2>

      <div className="tables-grid">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`table-card 
            ${selectedTable === table.id ? "active" : ""}
            ${!table.available ? "disabled" : ""}
            `}
            onClick={() =>
              table.available && setSelectedTable(table.id)
            }
          >
            <h3>{table.seats}-seat</h3>
            <p>T{table.id}</p>

            {!table.available && <span>Full</span>}
          </div>
        ))}
      </div>

      {/* FORM */}
      <div className="booking-form">

        <h2>Booking Details</h2>

              <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

            <input
      type="text"
      placeholder="Phone Number"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
/>

          <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
/>

        <select>
          <option>2 Guests</option>
          <option>4 Guests</option>
          <option>6 Guests</option>
          <option>8 Guests</option>
          <option>10 Guests</option>
        </select>

        {/* TIME */}
        <div className="time-section">
          <h3>Preferred Time</h3>

          <div className="time-slots">
            {[
              "12:00 PM",
              "1:00 PM",
              "2:00 PM",
              "6:00 PM",

              "7:00 PM",
              "8:00 PM",
            ].map((time) => (
              <button
              type="button"
                key={time}
                className={selectedTime === time ? "time-active" : ""}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* FOOD */}
        <div className="food-section">
          <h2>Pre-Order Food</h2>

          <div className="foods-grid">

  {foods.map((item) => (

    <div key={item.id} className="foods-card">


      <img
        src={`http://localhost:5194${item.imageUrl}`}
        alt={item.name}
        className="booking-food-image"
      />


      <h3 className="food-name">
        {item.name}
      </h3>


      <p className="food-price">
        ₹{item.price}
      </p>


      <button onClick={() => toggleFood(item)}>

        {selectedFood.find((f)=>f.id===item.id)
          ? "Remove"
          : "Add"}

      </button>


    </div>

  ))}

</div>
        </div>

        {/* SUMMARY */}
        <div className="summary-box">
          <h2>Order Summary</h2>

          {selectedFood.map((item) => (
            <div className="summary-item" key={item.id}>
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </div>
          ))}

          <div className="summary-total">
            <strong>Total</strong>
            <strong>₹{total}</strong>
          </div>
        </div>

              <button
        className="confirm-btn"
        onClick={() => setShowReceipt(true)}
      >
        Confirm Reservation
      </button>
      {showReceipt && (
  <div className="receipt-overlay">

    <div className="receipt-box">

          <button
      className="close-btn"
      onClick={() => setShowReceipt(false)}
    >
      ✕
    </button>

      <h1>FoodSphere Receipt</h1>

      <p><strong>Name:</strong> {name}</p>

      <p><strong>Phone:</strong> {phone}</p>

      <p><strong>Date:</strong> {date}</p>

      <p><strong>Time:</strong> {selectedTime}</p>

      <p><strong>Table:</strong> T{selectedTable}</p>

      <h3>Ordered Foods</h3>

      {selectedFood.map((item) => (
        <div key={item.id} className="receipt-item">
          <span>{item.name}</span>
          <span>₹{item.price}</span>
        </div>
      ))}

      <h2 className="receipt-total">
  Total: ₹{total}
</h2>

<h3 className="payment-title">
  Select Payment Method
</h3>

<div className="receipt-buttons">

  <button
    className="download-btn"
    onClick={downloadReceipt}
  >
    Download Receipt
  </button>

  <button
    className="upi-btn"
   onClick={() => {
  if (validateBooking()) {
    openRazorpay();
  }
}}
  >
    UPI Payment
  </button>

  <button
    className="card-btn"
    onClick={() => {
  if (validateBooking()) {
    openRazorpay();
  }
}}
  >
    Card Payment
  </button>

  <button
    className="cash-btn"
    onClick={handleCashPayment}
  >
    Pay at Restaurant
  </button>

</div>
  {/* <button
    className="pay-btn"
    onClick={() => setShowPaymentOptions(true)}
  >
    Pay Now
  </button> */}

</div>

    </div>

  
)}

      </div>
    </div>
  );
}

export default RestaurantBooking;