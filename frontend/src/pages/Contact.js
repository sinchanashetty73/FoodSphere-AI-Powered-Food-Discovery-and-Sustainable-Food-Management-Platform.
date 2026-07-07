
import React,{useState} from "react";
import "./Contact.css";
import axios from "axios";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram
} from "react-icons/fa";

const Contact = () => {
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [subject, setSubject] = useState("");
const [message, setMessage] = useState("");
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/contact`,
      {
        name,
        email,
        subject,
        message,
      }
    );

    alert(response.data.message);

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");

  } catch (error) {
    console.log(error);

    alert("Error submitting form");
  }
};
  return (
  <div className="contact-page">

    {/* HERO */}
    <div className="contact-hero">
      <h1>CONTACT US</h1>
    </div>

    {/* MAIN SECTION */}
    <div className="contact-container">

      {/* LEFT */}
      <div className="contact-left">

        <h4>— KEEP CLOSE</h4>

        <h2>Get In Touch</h2>

        <p>
          We’d love to hear from you. Whether you have questions,
          feedback, or want to collaborate — feel free to reach out.
        </p>

        <div className="contact-info">
          <p>📍 Belgaum, Karnataka, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ foodsphere@gmail.com</p>
          <p>⏰ Open: 9:00 AM – 10:00 PM</p>
        </div>

        <div className="socials">
          <span>🌐</span>
          <span>📘</span>
          <span>📸</span>
          <span>🐦</span>
        </div>

      </div>

      {/* RIGHT FORM */}
      <div className="contact-right glass-box">

        <h2>Your Details</h2>

        <p>Let us know how to get back to you.</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit">
            CONTACT US
          </button>

        </form>

      </div>

    </div>

    {/* RESERVE SECTION */}
    <div className="reserve">
      {/* Optional Content */}
      {/* <h2>Reserve A Table Now</h2>
      <button>MAKE A RESERVATION</button> */}
    </div>

    {/* FOOTER */}
    <footer className="contact-footer">

      <h2>FoodSphere AI</h2>

      <p>Connecting people through food & kindness</p>

      <div className="footer-socials">

  <a href="https://facebook.com" target="_blank" rel="noreferrer">
    <FaFacebookF />
  </a>

  <a href="https://twitter.com" target="_blank" rel="noreferrer">
    <FaTwitter />
  </a>

  <a href="https://instagram.com" target="_blank" rel="noreferrer">
    <FaInstagram />
  </a>

</div>

      <p className="copyright">
        © 2026 FoodSphere AI. All rights reserved.
      </p>

    </footer>

  </div>
);
};

export default Contact;