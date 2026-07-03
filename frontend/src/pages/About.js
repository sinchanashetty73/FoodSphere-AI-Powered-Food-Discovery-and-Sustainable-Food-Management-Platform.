import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">

      {/* HERO */}
      <div className="about-hero">
        <h1>About Us</h1>
      </div>

      {/* INTRO */}
      <div className="about-intro">
        <h2 >We Invite You to Explore FoodSphere</h2>
        <div className="about-box">
        <p>
          A Smart Food & Community Ecosystem Platform connecting customers, restaurants and home-based food sellers while promoting sustainability, affordability and healthy eating.
        </p>

       </div> 
      </div>

      {/* FEATURES */}
      <h1 className="section-title">Key Features</h1>

      <div className="features-grid">
        <div className="feature-cards">
          <div className="icon blue">🏅</div>
          <h3>Restaurant Profiles</h3>
          <p>Detailed profiles with chef information, star ratings, hygiene scores, menus with images, and customer reviews.</p>
        </div>

        <div className="feature-cards">
          <div className="icon orange">❤️</div>
          <h3>Homemade Food Marketplace</h3>
          <p>Empowers individuals, especially small-scale and economically disadvantaged cooks, to sell home-prepared meals and earn income.</p>
        </div>

        <div className="feature-cards">
          <div className="icon purple"> 🥗</div>
          <h3>Night-Time Deals</h3>
          <p>Restaurants list unsold food at 40-50% discounts, reducing waste and increasing affordability while sending notifications to nearby users.</p>
        </div>

        <div className="feature-cards">
          <div className="icon green">🤖</div>
          <h3>AI-Powered Chatbot</h3>
          <p>Explains dishes, provides recipes, suggests alternatives, calculates health scores, identifies allergens, and recommends nearby options.</p>
        </div>

        <div className="feature-cards">
          <div className="icon pink">💖</div>
          <h3>Donation Module</h3>
          <p>Sponsor meals to underprivileged communities, supporting local shelters and charitable organizations.</p>
        </div>

        <div className="feature-cards">
          <div className="icon yellow">👨‍💼</div>
          <h3>Analytics Dashboard</h3>
          <p>Track performance and insights.</p>
        </div>
      </div>

      <div className="mission">
        <h1>Our Vision</h1>
        <p>FoodSphere AI is designed to create a unified digital ecosystem that revolutionizes how people discover, order, and experience food. We combine cutting-edge artificial intelligence with social impact initiatives to build a platform that benefits everyone - from customers seeking great meals to home cooks looking for income opportunities, and restaurants working to reduce waste.</p>
      </div>

      {/* CHEF SECTION */}
      

      

    </div>
  );
};

export default About;