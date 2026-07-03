import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Restaurants.css";


const RestaurantsPage = () => {

  const [activeCategory, setActiveCategory] = useState("all");
  const navigate=useNavigate();
 
  // Search the Items
  const [searchTerm, setSearchTerm] = useState("");
const [restaurants,setRestaurants] = useState([]);

useEffect(()=>{

fetchRestaurants();

},[]);



const fetchRestaurants = async()=>{

try{

const res = await axios.get(
"http://localhost:5194/api/Restaurants"
);

console.log("Restaurants from API:", res.data);

setRestaurants(res.data);


setRestaurants(res.data);

}
catch(error){

console.log(error);

}

};

const filteredrestaurants = restaurants.filter((item)=>{

const matchesCategory =
activeCategory === "all" ||
item.category
?.toLowerCase()
.split(",")
.map(c => c.trim())
.includes(activeCategory);


const matchesSearch =
item.name
.toLowerCase()
.includes(searchTerm.toLowerCase());


return matchesCategory && matchesSearch;

});

  return (
    
    
    <div>
      {/* SEARCH BAR */}
      <div className="search-wrapper">
        <div className="location-section">
          <span>📍</span>
          <span>Your Location</span>
        </div>

        <span className="divider"></span>

       <div className="search-section">
  <span>🔍</span>

      <input
        type="text"
        placeholder="Search restaurants..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>
      </div>

      {/* FILTER BUTTONS */}

      
      <div className="occasion-navbar">
        <button onClick={() => setActiveCategory("all")}>All</button>
        <button onClick={() => setActiveCategory("birthday")}>🎂 Birthday</button>
        <button onClick={() => setActiveCategory("party")}>🎉 Party</button>
        <button onClick={() =>setActiveCategory("get-together")}>👨‍👩‍👧‍👦 Get-Together</button>
        <button onClick={() => setActiveCategory("romantic")}>💖 Romantic</button>
      </div>

      {/* RESTAURANTS */}
      <div className="menu-grid">
         {filteredrestaurants.map((item) => (
       <div className="menu-item"
key={item.id}
onClick={()=>navigate(`/restaurant/${item.id}`)}
>

<img
src={
item.imageUrl?.startsWith("http")
? item.imageUrl
:`http://localhost:5194${item.imageUrl}`
}
alt={item.name}
/>


<h3>{item.name}</h3>

<p>📍 {item.location}</p>

<div>
⭐ {item.rating}
</div>


</div>
        ))}
      </div>

     

    </div>
  );
};

export default RestaurantsPage;