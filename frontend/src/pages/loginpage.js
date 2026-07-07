import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./loginpage.css";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();

 const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("user");

const handleLogin = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.text();

    if (response.ok) {

  localStorage.setItem("user", email);

  localStorage.setItem("role", role);

  alert("Login Successful ✅");

  if (role === "admin") {
    navigate("/admin");
  } else {
    navigate("/home");
  }

} else {
      alert("Invalid email or password ❌");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};


  const images = [

    "https://i.pinimg.com/736x/47/c9/67/47c96751d31f7eda5d1ca8ddacf3af53.jpg",

    "https://i.pinimg.com/736x/8e/6e/35/8e6e35cbd62d02a2af70c0cb1babaefe.jpg",

    "https://i.pinimg.com/736x/71/1e/3d/711e3d56879c69498e1dad9ec471fea3.jpg",

    "https://i.pinimg.com/736x/c1/86/5e/c1865e60ca63442846e3c5641adce779.jpg",

    "https://i.pinimg.com/736x/13/13/6f/13136f994da6554f83d08cf56b570f81.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="login-wrapper">
      <div className="login-container">

        {/* Left Image Section */}
       <div className="image-section">
      <img
        key={currentIndex}
        src={images[currentIndex]}
        alt="Food"
        className="slider-image"
      />
    </div>

        {/* Right Login Section */}
        <div className="form-section">
          <h2>Login to your account</h2>
          <p>Welcome back! Login with Email</p>
          {/* admin login */}
          <div className="role-selection">

  <div
    className={
      role === "user"
        ? "role-card active"
        : "role-card"
    }
    onClick={() => setRole("user")}
  >
     User
  </div>

  <div
    className={
      role === "admin"
        ? "role-card active"
        : "role-card"
    }
    onClick={() => setRole("admin")}
  >
     Admin
  </div>

</div>
            <input
                type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />  
        
         <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />    

          <button className="login-btn"
          onClick={handleLogin}>Login</button>

          <p className="or-text">or select method to log in</p>

          import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";


<div className="social-buttons">

  <button className="google-btn">

    <FcGoogle className="social-icon"/>

    <span>Continue with Google</span>

  </button>


  <button className="facebook-btn">

    <FaFacebookF className="social-icon facebook-icon"/>

    <span>Continue with Facebook</span>

  </button>


</div>

              <p className="signup-text">
              Don’t have an account?{" "}
           <Link to="/signup" className="signup-link">
           Create account
         </Link>
</p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;