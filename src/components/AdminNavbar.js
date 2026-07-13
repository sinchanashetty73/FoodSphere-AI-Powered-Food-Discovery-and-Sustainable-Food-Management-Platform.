import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminNavbar.css";

const AdminNavbar = () => {

    const navigate = useNavigate();
const handleLogout = () => {

        if(window.confirm("Are you sure you want to logout?")){
            navigate("/");
        }

    };
    
    return (

        <nav className="admin-navbar">

            <div className="logo">

<img 
src="/logo.png"
alt="FoodSpire Logo" 
className="logo-img"
/>

<span>FoodSpire Admin</span>

</div>

            <div className="admin-nav-center">

                <NavLink to="/admin" className="admin-nav-item">
                    Dashboard
                </NavLink>

                <NavLink to="/admin/restaurants" className="admin-nav-item">
                    Restaurants
                </NavLink>

                <NavLink to="/admin/homemade-foods" className="admin-nav-item">
                    Homemade Foods
                </NavLink>

                <NavLink to="/admin/nightdeals" className="admin-nav-item">
                    Night Deals
                </NavLink>

                <NavLink to="/admin/donations" className="admin-nav-item">
                    Donations
                </NavLink>

                <NavLink to="/admin/volunteers" className="admin-nav-item">
                    Volunteers
                </NavLink>

            </div>

            <button
                className="admin-logout-btn"
                onClick={handleLogout}
            >
                Logout
            </button>

        </nav>

    );
};

export default AdminNavbar;