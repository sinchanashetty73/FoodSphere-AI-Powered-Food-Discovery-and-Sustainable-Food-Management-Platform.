
import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaTwitter, FaFacebook, FaGoogle } from "react-icons/fa";



function Signup() {

  const navigate = useNavigate();
  
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

  const handleSignup = async () => {
  try {
    const response = await fetch("https://foodsphere-api.onrender.com/api/Auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    const data = await response.text();

    if (response.ok) {
      alert("Signup Successful ✅");
      navigate("/")
    } else {
      alert(data); // shows error like "Email already exists"
    }
  } catch (error) {
    console.error(error);
    alert("Server error ❌");
  }
};
 return (
  <div className="signup-page">

    {/* Animated Bubbles */}
    <div className="bubbles">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div className="signup-container">

      {/* Left Content */}
      <div className="left-section">
        <h1>It's time to boost your creativity</h1>

        <div className="signin-box">
          <p>Here you are</p>

          <Link to="/" className="signin-btn">
            Sign in →
          </Link>

        </div>
      </div>

      {/* Right Glass Form */}
      <div className="glass-box">

        <h2>Sign Up</h2>

        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="E-mail Address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="signup-btn"
          onClick={handleSignup}
        >
          Create Account
        </button>

        <p className="or-text">
          or sign up with
        </p>

        <div className="social-icons">

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>

          <a
            href="https://accounts.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGoogle />
          </a>

        </div>

      </div>

    </div>

  </div>
);
}

export default Signup;