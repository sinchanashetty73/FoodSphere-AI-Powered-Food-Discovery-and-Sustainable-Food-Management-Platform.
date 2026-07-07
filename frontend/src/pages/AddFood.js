import React, { useState } from "react";
import "./addfood.css";
import { useNavigate } from "react-router-dom";

function AddFood() {
  const navigate = useNavigate();

  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [location, setLocation] = useState("");

  const handleAddFood = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/Fcm/save-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          foodName: foodName,
          description: description,
          expiryTime: expiryTime,
          location: location,
          isAvailable: true,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Food Added Successfully ✅");

        navigate("/home");
      } else {
        alert("Failed to add food ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error ❌");
    }
  };

  return (
    <div className="addfood-page">
      <div className="addfood-container">

        <h2>Add Food</h2>

        <input
          type="text"
          placeholder="Food Name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="datetime-local"
          value={expiryTime}
          onChange={(e) => setExpiryTime(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={handleAddFood}>
          Add Food
        </button>

      </div>
    </div>
  );
}

export default AddFood;