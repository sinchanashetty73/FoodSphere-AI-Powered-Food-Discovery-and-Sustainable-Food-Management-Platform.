import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import "./HomeFoodAdmin.css";

const HomeFoodAdmin = () => {
   const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [newFood, setNewFood] = useState({
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

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await axios.get(
        "https://foodsphere-api.onrender.com/api/HomeMadeFoods"
      );

      setFoods(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addFood = async () => {
    try {
      await axios.post(
        "https://foodsphere-api.onrender.com/api/HomeMadeFoods",
        newFood
      );

      fetchFoods();

      setNewFood({
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

      alert("Food Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFood = async (id) => {
    if (!window.confirm("Delete this food?")) return;

    try {
      await axios.delete(
        `https://foodsphere-api.onrender.com/api/HomeMadeFoods/${id}`
      );

      fetchFoods();

      alert("Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateFood = async (food) => {
    try {
      await axios.put(
        `https://foodsphere-api.onrender.com/api/HomeMadeFoods/${food.id}`,
        food
      );

      fetchFoods();
      setEditingId(null);

      alert("Food Updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
        <>
<AdminNavbar />
    <div className="homefood-admin">

      <div className="homefood-header">
        <h1>🍱 Homemade Food Management</h1>
        <p>
          Manage Homemade Foods, Prices and Sellers
        </p>
      </div>

      <div className="add-food-card">

        <h2>Add New Food</h2>

        <input
          placeholder="Food Name"
          value={newFood.name}
          onChange={(e) =>
            setNewFood({
              ...newFood,
              name: e.target.value
            })
          }
        />

        <input
          placeholder="Image URL"
          value={newFood.imageUrl}
          onChange={(e) =>
            setNewFood({
              ...newFood,
              imageUrl: e.target.value
            })
          }
        />

        <input
          placeholder="Price"
          value={newFood.price}
          onChange={(e) =>
            setNewFood({
              ...newFood,
              price: e.target.value
            })
          }
        />

        <input
          placeholder="Original Price"
          value={newFood.originalPrice}
          onChange={(e) =>
            setNewFood({
              ...newFood,
              originalPrice: e.target.value
            })
          }
        />

        <input
          placeholder="Seller"
          value={newFood.seller}
          onChange={(e) =>
            setNewFood({
              ...newFood,
              seller: e.target.value
            })
          }
        />

        <input
          placeholder="Rating"
          value={newFood.rating}
          onChange={(e) =>
            setNewFood({
              ...newFood,
              rating: e.target.value
            })
          }
        />

        <input
          placeholder="Location"
          value={newFood.location}
          onChange={(e) =>
            setNewFood({
              ...newFood,
              location: e.target.value
            })
          }
        />

        <input
          placeholder="Category"
          value={newFood.category}
          onChange={(e) =>
            setNewFood({
              ...newFood,
              category: e.target.value
            })
          }
        />

        <textarea
          placeholder="Description"
          value={newFood.description}
          onChange={(e) =>
            setNewFood({
              ...newFood,
              description: e.target.value
            })
          }
        />

        <button onClick={addFood}>
          Add Food
        </button>

      </div>

      <div className="food-grid">

        {foods.map((food) => (

          <div className="food-card" key={food.id}>

            <img
  src={`https://foodsphere-api.onrender.com${food.imageUrl}`}
  alt={food.name}
/>

            {editingId === food.id ? (
              <>
                <input
                  value={food.name}
                  onChange={(e) =>
                    setFoods(
                      foods.map((f) =>
                        f.id === food.id
                          ? {
                              ...f,
                              name: e.target.value
                            }
                          : f
                      )
                    )
                  }
                />

                <input
                  value={food.location}
                  onChange={(e) =>
                    setFoods(
                      foods.map((f) =>
                        f.id === food.id
                          ? {
                              ...f,
                              location:
                                e.target.value
                            }
                          : f
                      )
                    )
                  }
                />

                <input
                  value={food.price}
                  onChange={(e) =>
                    setFoods(
                      foods.map((f) =>
                        f.id === food.id
                          ? {
                              ...f,
                              price:
                                e.target.value
                            }
                          : f
                      )
                    )
                  }
                />
              </>
            ) : (
              <>
                <h3>{food.name}</h3>
                <p>📍 {food.location}</p>
                <p>⭐ {food.rating}</p>
                <p>👩‍🍳 {food.seller}</p>
                <p>🍽 {food.category}</p>
                <p>₹ {food.price}</p>
                <p>{food.description}</p>
              </>
            )}

            <div className="food-actions">

              <button
                className="edit-btn"
                onClick={() =>
                  setEditingId(food.id)
                }
              >
                Edit
              </button>

              <button
                className="save-btn"
                onClick={() =>
                  updateFood(food)
                }
              >
                Save
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteFood(food.id)
                }
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
    </>
  );
};

export default HomeFoodAdmin;