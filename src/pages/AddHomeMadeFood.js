import React, { useState } from "react";

const AddHomeMadeFood = () => {

  const [food, setFood] = useState({
    name: "",
    imageUrl: "",
    price: "",
    originalPrice: "",
    seller: "",
    rating: "",
    location: "",
    description: "",
    category: ""
  });

  const handleChange = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/Fcm/save-token`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(food)
      }
    );

    if (response.ok) {

      alert("Food Added Successfully ✅");

      setFood({
        name: "",
        imageUrl: "",
        price: "",
        originalPrice: "",
        seller: "",
        rating: "",
        location: "",
        description: "",
        category: ""
      });

    } else {

      alert("Failed to Add Food ❌");

    }

  } catch (error) {

    console.error(error);

    alert("Server Error ❌");
  }
};

  return (

    <div style={{ padding: "40px" }}>

      <h1>Add Homemade Food</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={food.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={food.imageUrl}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={food.price}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="originalPrice"
          placeholder="Original Price"
          value={food.originalPrice}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="seller"
          placeholder="Seller"
          value={food.seller}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="rating"
          placeholder="Rating"
          value={food.rating}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={food.location}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={food.description}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={food.category}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Add Food
        </button>

      </form>

    </div>
  );
};

export default AddHomeMadeFood;