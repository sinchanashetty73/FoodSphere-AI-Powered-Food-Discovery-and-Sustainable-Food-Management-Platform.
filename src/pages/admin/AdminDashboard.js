import React from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import MealsChart from "../../components/charts/MealsChart";
import DonationChart from "../../components/charts/DonationChart";
import WasteChart from "../../components/charts/WasteChart";
import CategoryChart from "../../components/charts/CategoryChart";
import CountUp from "react-countup";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (


    <>
<AdminNavbar />
<div className="hero-section">

<div className="hero-overlay">

<h1>Together We Reduce Food Waste </h1>

<p>
Connecting Restaurants, Homemade Food Creators,
NGOs and Volunteers to feed people in need.
</p>

<div className="hero-buttons">



</div>

</div>

</div>

<div className="admin-dashboard">

 

      <div className="dashboard-header">
        <h1> FoodSpire Admin Dashboard</h1>
        <p>
          Manage donations, restaurants, volunteers, homemade foods and night deals
        </p>
      </div>

      

<h2 className="section-title">📊 Dashboard Overview</h2>

<div className="stats-grid">

  <div className="stat-card donation">
    <div className="stat-icon">❤️</div>
    <h3>Total Donations</h3>
    <h2>
      <CountUp end={245} duration={2} />
    </h2>
    <span className="growth positive">↑ 12% this month</span>
  </div>

  {/* <div className="stat-card pending">
    <div className="stat-icon">⏳</div>
    <h3>Pending Donations</h3>
    <h2>
      <CountUp end={34} duration={2} />
    </h2>
    <span className="growth warning">5 waiting approval</span>
  </div> */}

  <div className="stat-card volunteer">
    <div className="stat-icon">🚚</div>
    <h3>Volunteers</h3>
    <h2>
      <CountUp end={18} duration={2} />
    </h2>
    <span className="growth positive">12 Active</span>
  </div>

  <div className="stat-card ngo">
    <div className="stat-icon">🏢</div>
    <h3>NGOs</h3>
    <h2>
      <CountUp end={12} duration={2} />
    </h2>
    <span className="growth positive">3 New Partners</span>
  </div>

  <div className="stat-card meals">
    <div className="stat-icon">🍽</div>
    <h3>Meals Saved</h3>
    <h2>
      <CountUp end={12450} separator="," duration={2.5} />
    </h2>
    <span className="growth positive">↑ 18% Growth</span>
  </div>

  <div className="stat-card waste">
    <div className="stat-icon">♻</div>
    <h3>Food Waste Reduced</h3>
    <h2>2.4 Tons</h2>
    <span className="growth positive">↑ 20% Better</span>
  </div>

</div>
      <div className="quick-actions">

<h2 className="section-title">⚡ Quick Actions</h2>

<div className="quick-grid">

<div className="quick-card">
➕
<h3>Add Restaurant</h3>
</div>

<div className="quick-card">
🏠
<h3>Add Homemade Food</h3>
</div>

<div className="quick-card">
🌙
<h3>Create Night Deal</h3>
</div>

<div className="quick-card">
❤️
<h3>Approve Donation</h3>
</div>

<div className="quick-card">
🚚
<h3>Assign Volunteer</h3>
</div>




</div>

</div>
    {/* Statistical maps */}
    <h2 className="section-title">
    📊 FoodSpire Analytics
</h2>

<div className="analytics-grid">

    <MealsChart />
     <DonationChart /> 
     <CategoryChart />
     <WasteChart  />

</div>
      {/* Management Modules */}

      <h2 className="section-title">Management Modules</h2>

      <div className="module-grid">

        <div
          className="module-card"
          onClick={() => navigate("/admin/restaurants")}
        >
          <h2>🏪 Restaurants</h2>
          <p>
            Add, Edit, Delete Restaurants
          </p>
        </div>

        <div
          className="module-card"
          onClick={() => navigate("/admin/homemade-foods")}
        >
          <h2>🏠 Homemade Foods</h2>
          <p>
            Manage Homemade Food Listings
          </p>
        </div>

        <div
          className="module-card"
          onClick={() => navigate("/admin/nightdeals")}
        >
          <h2>🌙 Night Deals</h2>
          <p>
            Manage Discount Foods & Notifications
          </p>
        </div>

        <div
          className="module-card"
          onClick={() => navigate("/admin/donations")}
        >
          <h2>❤️ Donations</h2>
          <p>
            Track Donations & Assign Volunteers
          </p>
        </div>

        <div
          className="module-card"
          onClick={() => navigate("/admin/volunteers")}
        >
          <h2>🚚 Volunteers</h2>
          <p>
            Manage Pickup & Delivery Teams
          </p>
        </div>

        {/* <div
          className="module-card"
          onClick={() => navigate("/admin/notifications")}
        >
          <h2>🔔 Notifications</h2>
          <p>
            Send Alerts & Push Notifications
          </p>
        </div> */}

      </div>

      {/* Recent Activity */}

      <div className="activity-section">
        <h2>📋 Recent Activity</h2>

        <div className="activity-card">
          <p>✅ Donation FD102 approved</p>
          <p>🚚 Volunteer assigned to FD101</p>
          <p>🍽 Night Deal Pizza created</p>
          <p>🏠 Homemade Food added</p>
          <p>🎉 Event Donation delivered</p>
        </div>
      </div>

    </div>



</>
    
  );
};

export default AdminDashboard;