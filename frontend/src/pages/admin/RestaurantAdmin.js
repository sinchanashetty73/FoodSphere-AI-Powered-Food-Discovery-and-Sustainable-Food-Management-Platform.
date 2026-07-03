import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import "./RestaurantAdmin.css";

const RestaurantAdmin = () => {
   const navigate = useNavigate();
   
const [searchTerm, setSearchTerm] = useState("");
const [foodItems, setFoodItems] = useState([]);
const [newFood,setNewFood] = useState({
  name:"",
  price:"",
  imageUrl:""
});

const [editRestaurant, setEditRestaurant] = useState(null);

  const [restaurants, setRestaurants] = useState
  ([
    {
      id: 1,
      name: "Spice Garden",
      location: "Mangalore",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      description: "Famous South Indian Restaurant"
    },
    {
      id: 2,
      name: "Food Palace",
      location: "Bangalore",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9",
      description: "Multi Cuisine Restaurant"
    }
  ]);
useEffect(() => {

  fetchRestaurants();

  fetchFoodItems();

}, []);

const fetchFoodItems = async () => {

  try {

    const res = await axios.get(
      "http://localhost:5194/api/FoodItems"
    );

    setFoodItems(res.data);

  }
  catch(error){

    console.log(error);

  }

};

const fetchRestaurants = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5194/api/Restaurants"
    );

    setRestaurants(res.data);
  } catch (error) {
    console.error(error);
  }
};
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    location: "",
    rating: "",
    imageUrl: "",
    description: "",
    category:""
  });

  const addRestaurant = async () => {

  try{
    await axios.post(
      "http://localhost:5194/api/Restaurants",
      newRestaurant
    );

    fetchRestaurants();

    alert("Restaurant Added Successfully");
  }
  catch(error){
    console.log(error);
  }
};
// Add foods
const addFoodItem = async()=>{

await axios.post(
"http://localhost:5194/api/FoodItems",
{
 name:newFood.name,
 price:Number(newFood.price),
 imageUrl:newFood.imageUrl,
 restaurantId:editRestaurant.id
}
);


const res = await axios.get(
`http://localhost:5194/api/FoodItems/restaurant/${editRestaurant.id}`
);

setFoodItems(res.data);


setNewFood({
 name:"",
 price:"",
 imageUrl:""
});

alert("Food Added");

};
  const handleAddRestaurant = async () => {
  try {
    await axios.post(
      "http://localhost:5194/api/Restaurants",
      {
        name: newRestaurant.name,
        location: newRestaurant.location,
        rating: Number(newRestaurant.rating),
        imageUrl: newRestaurant.image
      }
    );

    fetchRestaurants();

    setNewRestaurant({
      name: "",
      location: "",
      rating: "",
     imageUrl: ""
    });

    alert("Restaurant Added Successfully");
  } catch (error) {
    console.error(error);
  }
};

 const handleDelete = async (id) => {

  if(!window.confirm("Delete Restaurant?"))
    return;

  try{

    await axios.delete(
      `http://localhost:5194/api/Restaurants/${id}`
    );

    fetchRestaurants();

    alert("Deleted Successfully");
  }
  catch(error){
    console.log(error);
  }
};
  const updateRestaurant = async (restaurant) => {

  try{

    await axios.put(
`http://localhost:5194/api/Restaurants/${restaurant.id}`,
{
name: restaurant.name,
location: restaurant.location,
rating: Number(restaurant.rating),
imageUrl: restaurant.imageUrl,
description: restaurant.description,

}
);

    fetchRestaurants();

    alert("Restaurant Updated");
  }
  catch(error){
    console.log(error);
  }
};
  return (
        <>
<AdminNavbar />
   <div className="restaurant-admin">

  {/* Hero Header */}

  <div className="restaurant-hero">

    <div className="hero-left">

      <h1>🏪 Restaurant Management</h1>

      <p>
        Manage all restaurant listings, update restaurant information,
        maintain ratings, locations and images from one place.
      </p>

      <div className="hero-buttons">

 



      </div>

    </div>

    <div className="hero-right">

     

    </div>

  </div>

  {/* Statistics */}

  <div className="restaurant-stats">

    <div className="stat-box">
      <h2>{restaurants.length}</h2>
      <p>Total Restaurants</p>
    </div>

    <div className="stat-box">
      <h2>4.6 ⭐</h2>
      <p>Average Rating</p>
    </div>

    <div className="stat-box">
      <h2>2,450</h2>
      <p>Meals Donated</p>
    </div>

    <div className="stat-box">
      <h2>12</h2>
      <p>Cities Covered</p>
    </div>

  </div>

  

  {/* Add Restaurant */}

  <div className="add-form">

    <h2>🍽 Add New Restaurant</h2>

    <div className="form-grid">

      <input

        type="text"

        placeholder="Restaurant Name"

        value={newRestaurant.name}

        onChange={(e)=>

          setNewRestaurant({

            ...newRestaurant,

            name:e.target.value

          })

        }

      />

      <input

        type="text"

        placeholder="Location"

        value={newRestaurant.location}

        onChange={(e)=>

          setNewRestaurant({

            ...newRestaurant,

            location:e.target.value

          })

        }

      />

      <input

        type="number"

        placeholder="Rating"

        value={newRestaurant.rating}

        onChange={(e)=>

          setNewRestaurant({

            ...newRestaurant,

            rating:e.target.value

          })

        }

      />

      <input

        type="text"

        placeholder="Image URL"

        value={newRestaurant.imageUrl}

        onChange={(e)=>

          setNewRestaurant({

            ...newRestaurant,

            imageUrl:e.target.value

          })

        }

      />

    </div>

    <textarea

      placeholder="Restaurant Description"

      value={newRestaurant.description}

      onChange={(e)=>

        setNewRestaurant({

          ...newRestaurant,

          description:e.target.value

        })

      }

    />

    {/* Live Image Preview */}

    {newRestaurant.imageUrl && (

      <div className="preview">

        <h4>Image Preview</h4>

        <img

          src={newRestaurant.imageUrl}

          alt="preview"

        />

      </div>

    )}

    <button

      className="add-btn"

      onClick={handleAddRestaurant}

    >

      Add Restaurant

    </button>

  </div>

      {/* Restaurant List */}

     <div className="restaurant-grid">

{restaurants
.filter((restaurant)=>

restaurant.name
.toLowerCase()
.includes(searchTerm.toLowerCase())

)

.map((restaurant)=>(

<div className="restaurant-card" key={restaurant.id}>

    <div className="image-container">

        <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
        />

        <span className="rating-badge">
            ⭐ {restaurant.rating}
        </span>

    </div>

    <div className="card-content">

        <h2>{restaurant.name}</h2>

        <span className="location">
            📍 {restaurant.location}
        </span>

        <p className="description">
            {restaurant.description}
        </p>

        <div className="action-buttons">

      

 <button
  className="edit-btns"
onClick={async () => {

setEditRestaurant({
 ...restaurant,
 description: restaurant.description || "",
 imageUrl: restaurant.imageUrl || ""
});

const res = await axios.get(
`http://localhost:5194/api/FoodItems/restaurant/${restaurant.id}`
);

setFoodItems(res.data);

}}
>
  ✏ Edit
</button>

           <button
  className="delete-btns"
  onClick={() => handleDelete(restaurant.id)}
>
  🗑 Delete
</button>

        </div>

    </div>

</div>

))

}

</div>
{editRestaurant !== null && (

<div className="modal-overlay">
  <div className="modal-overlay">


<div className="edit-modal glass">
  <button
className="modal-close-btn"
onClick={()=>setEditRestaurant(null)}
>
✕
</button>


<h1>🍽 Edit Restaurant</h1>


<input
value={editRestaurant.name}
onChange={(e)=>
setEditRestaurant({
...editRestaurant,
name:e.target.value
})
}
/>


<input
value={editRestaurant.location}
onChange={(e)=>
setEditRestaurant({
...editRestaurant,
location:e.target.value
})
}
/>


<input
value={editRestaurant.rating}
onChange={(e)=>
setEditRestaurant({
...editRestaurant,
rating:e.target.value
})
}
/>


<input
value={editRestaurant.imageUrl}
onChange={(e)=>
setEditRestaurant({
...editRestaurant,
imageUrl:e.target.value
})
}
/>


<img
src={editRestaurant.imageUrl}
className="preview-image"
/>


<h2>🍔 Food Items</h2>


<div className="foods-list">

{foodItems.map(food=>(

<div className="food-small-card">

<img
src={
 food.imageUrl?.startsWith("http")
 ? food.imageUrl
 : `http://localhost:5194${food.imageUrl}`
}
alt={food.name}
/>

<div>

<h3>{food.name}</h3>

<p>₹{food.price}</p>

</div>

</div>

))}

</div>



<h2>Add New Food</h2>


<input
placeholder="Food Name"
value={newFood.name}
onChange={(e)=>
setNewFood({
...newFood,
name:e.target.value
})
}
/>


<input
placeholder="Price"
value={newFood.price}
onChange={(e)=>
setNewFood({
...newFood,
price:e.target.value
})
}
/>


<input
placeholder="Food Image URL"
value={newFood.imageUrl}
onChange={(e)=>
setNewFood({
...newFood,
imageUrl:e.target.value
})
}
/>
<input
placeholder="Category"
value={newRestaurant.category}
onChange={(e)=>
setNewRestaurant({
...newRestaurant,
category:e.target.value
})
}
/>


<button 
className="add-food-btn"
onClick={addFoodItem}
>
+ Add Food
</button>



<div className="modal-buttons">


<button
className="save-btn"
onClick={async()=>{

await updateRestaurant(editRestaurant);

setEditRestaurant(null);

}}
>
Save
</button>


<button
className="cancel-btn"
onClick={()=>
setEditRestaurant(null)
}
>
Cancel
</button>


</div>


</div>


</div>

<div className="edit-modal">

<h2>Edit Restaurant</h2>

<input
value={editRestaurant.name}
onChange={(e)=>
setEditRestaurant({
...editRestaurant,
name:e.target.value
})
}
/>

<input
value={editRestaurant.location}
onChange={(e)=>
setEditRestaurant({
...editRestaurant,
location:e.target.value
})
}
/>

<input
value={editRestaurant.rating}
onChange={(e)=>
setEditRestaurant({
...editRestaurant,
rating:e.target.value
})
}
/>

<input
value={editRestaurant.imageUrl}
onChange={(e)=>
setEditRestaurant({
...editRestaurant,
imageUrl:e.target.value
})
}
/>

<textarea
value={editRestaurant.description}
onChange={(e)=>
setEditRestaurant({
...editRestaurant,
description:e.target.value
})
}
/>

<img
    src={
      editRestaurant.imageUrl
        ? editRestaurant.imageUrl
        : "https://placehold.co/500x250?text=No+Image"
    }
    alt="preview"
    className="preview-image"
/>

<div className="modal-buttons">

 <button
    className="save-btn"
    onClick={async () => {
      await updateRestaurant(editRestaurant);
      setEditRestaurant(null);
    }}
  >
    Save 
  </button>

<button
className="cancel-btn"
onClick={() => setEditRestaurant(null)}
>
cancel
</button>

</div>

</div>

</div>

)
}

      </div>
      </>

    
  );
};

export default RestaurantAdmin;