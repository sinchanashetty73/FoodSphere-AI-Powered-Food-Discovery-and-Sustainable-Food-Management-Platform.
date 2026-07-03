import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import Restaurants from "../data/restorants";

import "./homepage.css";

const HomePage = () => {

  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {

  const search = searchTerm.toLowerCase();

  if (search.includes("restaurant")) {
    navigate("/restaurants");
  }

  else if (
    search.includes("homemade") ||
    search.includes("home")
  ) {
    navigate("/homemadefoods");
  }

  else if (
    search.includes("deal") ||
    search.includes("leftover")
  ) {
    navigate("/leftoverfood");
  }

  else if (
    search.includes("ai") ||
    search.includes("chat")
  ) {
    navigate("/chatbot");
  }

  else {
    alert(`Searching for: ${searchTerm}`);
  }
};

  const goToRestaurant = (id) => {
    navigate(`/restaurant/${id}`);
  };

  const goToHomemade = (id) => {
    navigate(`/homemade/${id}`);
  };

  const goToLeftover = (id) => {
    navigate(`/nightdeals/${id}`);
  };

  useEffect(() => {
    const user = localStorage.getItem("userEmail");

    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  return (

    <div>

      {/* CAROUSEL SECTION */}
      

         

<section className="heros">

<div className="hero-sections">

{/* floating foods */}

<img 
src="https://i.pinimg.com/736x/40/e2/7a/40e27a05a4503fa82f20e1c2f1f330a1.jpg"
className="float-food food1"
/>

<img 
src="https://i.pinimg.com/736x/90/fa/94/90fa9415fa688431e05075009f721fcd.jpg"
className="float-food food2"
/>

<img 
src="https://i.pinimg.com/736x/31/60/c4/3160c459f01fa8b364f2faa2853a2459.jpg"
className="float-food food3"
/>

<img 
src="https://i.pinimg.com/1200x/11/2f/20/112f20759c39e7a4292f0cd539866819.jpg"
className="float-food food4"
/>

<img 
src="https://i.pinimg.com/736x/a4/16/a5/a416a5f04eabd5bf36b51b7fc19ddf6a.jpg"
className="float-food food5"
/>

<img
src="https://i.pinimg.com/736x/f4/9b/0e/f49b0e5c0fa859cdee22dff63efd7351.jpg"
className="float-food food5"
/>


<div className="hero-contents">

<h1>

<span>Welcome to FoodSpire</span>
</h1>


<h3>
Save Food • Save Money • Save Earth 🌍
</h3>


<p>
Discover delicious meals from nearby restaurants,
homemade kitchens and leftover food deals while
reducing food waste through smart recommendations.
</p>


<div className="hero-stats">

<div>
<h2>500+</h2>
<p>Restaurants</p>
</div>

<div>
<h2>50K+</h2>
<p>Meals Saved</p>
</div>

<div>
<h2>10K+</h2>
<p>Happy Users</p>
</div>


</div>

</div>


</div>

</section>
<section className="carousel-section" id="index">
<h2 className="lang">
          Special Dishes
        </h2>
        <div className="carousel-container">

          <div className="carousel-track">

            <img src="dish1.jpeg" alt="Dish 1" />
            <img src="dish2.jpeg" alt="Dish 2" />
            <img src="Ice Cream.jpeg" alt="Ice Cream" />
            <img src="piza.jpeg" alt="Pizza" />
            <img src="special1.jpeg" alt="Special Dish" />
            <img src="biryani.jpeg" alt="Biryani" />
            <img src="dish3.jpeg" alt="Dish 3" />
            <img src="dish4.jpeg" alt="Dish 4" />
            <img src="dish5.jpeg" alt="Dish 5" />

            {/* Duplicate Images */}
            <img src="dish1.jpeg" alt="Dish 1" />
            <img src="dish2.jpeg" alt="Dish 2" />
            <img src="Ice Cream.jpeg" alt="Ice Cream" />
            <img src="piza.jpeg" alt="Pizza" />
            <img src="special1.jpeg" alt="Special Dish" />
            <img src="biryani.jpeg" alt="Biryani" />
            <img src="dish3.jpeg" alt="Dish 3" />
            <img src="dish4.jpeg" alt="Dish 4" />
            <img src="dish5.jpeg" alt="Dish 5" />

          </div>




        </div>

      </section>

      

      {/* RESTAURANTS */}
      <section className="restaurants">

        <h2>Our Restaurants</h2>

        <div className="restaurant-container">

          <div
            className="card"
            onClick={() => goToRestaurant(1)}
          >
            <img src="https://i.pinimg.com/736x/98/13/fe/9813fe405e7881e89b4c03b68252bf29.jpg" alt="" />
            <h3>Sakura Restaurant</h3>
            <p className="rating">
  ⭐ 4.8 <span>(1.2k Reviews)</span>
</p>
          </div>

          <div
            className="card"
            onClick={() => goToRestaurant(2)}
          >
            <img src="https://i.pinimg.com/1200x/56/52/3e/56523e800ac1954ba7f99d3f96210f01.jpg" alt="" />
            <h3>Zen Garden Bites</h3>
            <p className="rating">
  ⭐ 5.0 <span>(6.2k Reviews)</span>
</p>
          </div>

          <div
            className="card"
            onClick={() => goToRestaurant(4)}
          >
            <img src="https://i.pinimg.com/1200x/f9/ce/35/f9ce35df37ff5ecf8cd499e2d281adad.jpg" alt="" />
            <h3>Miso Hungry</h3>
            <p className="rating">
  ⭐ 4.3 <span>(5.2k Reviews)</span>
</p>
          </div>

          <div
            className="card"
            onClick={() => goToRestaurant(6)}
          >
            <img src="https://i.pinimg.com/1200x/46/7c/b8/467cb81481e3c6f0ceec4f94ede12692.jpg" alt="" />
            <h3>Mizuki</h3>
            <p className="rating">
  ⭐ 3.8 <span>(5.2k Reviews)</span>
</p>
          </div>

          <div
            className="card"
            onClick={() => goToRestaurant(12)}
          >
            <img src="https://i.pinimg.com/736x/96/a5/11/96a511585c3357e1d663402debda85c3.jpg" alt="" />
            <h3>Zen Cafe</h3>
            <p className="rating">
  ⭐ 4.6 <span>(1.8k Reviews)</span>
</p>
          </div>

          <div
            className="card"
            onClick={() => goToRestaurant(11)}
          >
            <img src="https://i.pinimg.com/736x/ba/62/a3/ba62a336c687a4bf1c54fbf8c79ebcf0.jpg" alt="" />
            <h3>Niku-Azabu</h3>
            <p className="rating">
  ⭐ 4.8 <span>(1.2k Reviews)</span>
</p>
          </div>

        </div>

      </section>

      {/* HOMEMADE */}
      <section className="HomeMade">

        <h2>Fresh Home Made Delights</h2>

        <div className="home-made-container">

          <div
            className="home-made-card"
            onClick={() => goToHomemade(1)}
          >
            <img src="Masala Dosa.jpg" alt="Masala Dosa" />
            <h3>Masala Dosa</h3>
            <p className="rating">
  ⭐ 4.6 <span>(1.2k Reviews)</span>
</p>
          </div>

          <div
            className="home-made-card"
            onClick={() => goToHomemade(9)}
          >
            <img src="Ramen Bowl.jpg" alt="Ramen Bowl" />
            <h3>Ramen Bowl</h3>
            <p className="rating">
  ⭐ 4.4 <span>(2.2k Reviews)</span>
</p>
          </div>
      
       <div
            className="home-made-card"
            onClick={() => goToHomemade(7)}
          >
            <img src="Homemade Mini Snacks Box.jpg" alt="Ramen Bowl" />
            <h3>Mini Snacks Box</h3>
            <p className="rating">
  ⭐ 4.9<span>(3.2k Reviews)</span>
</p>
          </div>
           <div
            className="home-made-card"
            onClick={() => goToHomemade(11)}
          >
            <img src="Royal Desi Non-Veg Thali.jpg" alt="Ramen Bowl" />
            <h3>Royal Desi Non-Veg Thali</h3>
            <p className="rating">
  ⭐ 4.6 <span>(2.2k Reviews)</span>
</p>
          </div>
           <div
            className="home-made-card"
            onClick={() => goToHomemade(10)}
          >
            <img src="Hyderabadi Chicken Biryani.jpg" alt="Ramen Bowl" />
            <h3>Hyderabadi Chicken Biryani</h3>
            <p className="rating">
  ⭐ 4.4 <span>(1.6k Reviews)</span>
</p>
          </div>
          <div
            className="home-made-card"
            onClick={() => goToHomemade(13)}
          >
            <img src="Bento.jpg" alt="Bento" />
            <h3>Bento</h3>
            <p className="rating">
  ⭐ 4.6 <span>(1.2k Reviews)</span>
</p>
          </div>

        </div>

      </section>

      {/* LEFTOVER */}
      <section className="LeftOver">

        <h2>Tonight's Special Deals</h2>

        <div className="LeftOver-container">

          <div
            className="LeftOver-card"
            onClick={() => goToLeftover(2)}
          >
            <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80" alt="" />
            <h3>Chocolate Cake</h3>
           <p className="rating">
  ⭐ 4.1 <span>(2.2k Reviews)</span>
</p>
          </div>

          <div
            className="LeftOver-card"
            onClick={() => goToLeftover(8)}
          >
            <img src="https://i.pinimg.com/736x/8d/77/d3/8d77d3374fa03bd197d75f5ad1142ca1.jpg" alt="" />
            <h3>Pizza</h3>
            <p className="rating">
  ⭐ 4.7 <span>(3.2k Reviews)</span>
</p>
          </div>

          <div
            className="LeftOver-card"
            onClick={() => goToLeftover(6)}
          >
            <img src="https://i.pinimg.com/736x/a1/e1/ac/a1e1ac74cf629577a320496b06952a12.jpg" alt="" />
            <h3>Fresh Juice</h3>
            <p className="rating">
  ⭐ 4.6 <span>(2.2k Reviews)</span>
</p>
          </div>
          <div
            className="LeftOver-card"
            onClick={() => goToLeftover(4)}
          >
            <img src="https://i.pinimg.com/736x/18/89/be/1889be839aa05836703a632d1c945fb1.jpg" alt="" />
            <h3>Cold Coffee</h3>
           <p className="rating">
  ⭐ 4.2 <span>(1.5k Reviews)</span>
</p>
          </div>
          <div
            className="LeftOver-card"
            onClick={() => goToLeftover(9)}
          >
            <img src="https://i.pinimg.com/736x/bb/67/b6/bb67b6c74adea5ea54725c95e1f6971f.jpg" alt="" />
            <h3>Assorted Cookies</h3>
           <p className="rating">
  ⭐ 4.4 <span>(1.2k Reviews)</span>
</p>
          </div>
          <div
            className="LeftOver-card"
            onClick={() => goToLeftover(11)}
          >
            <img src="https://i.pinimg.com/736x/0c/d2/f2/0cd2f28fd6a558c54b8c9e4c16b52f81.jpg" alt="" />
            <h3>GudBud</h3>
            <p className="rating">
  ⭐ 4.8 <span>(1.2k Reviews)</span>
</p>
          </div>
          

        </div>

      </section>

    </div>
  );
};

export default HomePage;