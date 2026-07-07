import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {  Link } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
 const [isLogin, setIsLogin] = useState(
    localStorage.getItem("user") ? true : false
  );
  const handleLogout = () => {
   localStorage.removeItem("user");
  setIsLogin(false);
   navigate("/");
   
};
  return (
    
    <nav className="navbar">
       
        

      {/* LEFT LOGO */}
      <div className="logo-section">

  <img 
    src="/logo.png"
    alt="FoodSpire Logo"
    className="logo-imgs"
  />

  <span>FoodSpire</span>

</div>

      {/* CENTER LINKS */}
      <div className="nav-links">
        <NavLink to="/home" className="nav-item">Home</NavLink>
        <NavLink to="/restaurants" className="nav-item">Restaurants</NavLink>
        <NavLink to="/homemade" className="nav-item">Homemade Foods</NavLink>
        <NavLink to="/nightdeals" className="nav-item">Night Deals</NavLink>
        <NavLink to="/donate" className="nav-item">Donate</NavLink>
        <NavLink to="/about" className="nav-item">About</NavLink>
        <NavLink to="/contact" className="nav-item">Contact</NavLink>
        <NavLink to="/chatbot" className="nav-item">Chatbot🤖</NavLink>
      </div>

      {/* RIGHT SIDE BUTTONS */}
      <div className="right-buttons">
        {/* <button className="ai-btn">🤖 AI Assistant</button> */}
        {/* Login / Logout Button */}

    <Link to="/notifications" className="notification-icon">
    <IoNotifications />
    <span className="notification-badge"></span>
</Link>
        {
          localStorage.getItem("user") ? (
            <button className="login-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button
              className="login-btn"
              onClick={() => navigate("/")}
            >
              Login
            </button>
          )
        }
        
      </div>

    </nav>

    
  );
};

export default Navbar;