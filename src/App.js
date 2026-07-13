import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/loginpage";
import Signup from "./pages/signup";
import RestaurantsPage from "./pages/RestorantsPage";
import RestaurantDetails from "./pages/RestaurantDatails";
import HomePage from "./pages/homepage";
import  NightDeal from "./pages/NightDeals";
import HomeMadeFood from "./pages/HomeMadeFood";
import Donate from "./pages/Donate";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Chatbot from "./pages/Chatbot";
import AddFood from "./pages/AddFood";
import AddHomeMadeFood from "./pages/AddHomeMadeFood";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RestaurantAdmin from "./pages/admin/RestaurantAdmin";
import HomeFoodAdmin from "./pages/admin/HomeFoodAdmin";
import NightDealsAdmin from "./pages/admin/NightDealsAdmin";
import DonationAdmin from "./pages/admin/DonationAdmin";
import DonationTracking from "./pages/DonationTracking";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import NotificationPage from "./pages/NotificationPage";

function App() {
  return (
    <Router>
      <Routes>

        {/* FIRST PAGE */}
        <Route path="/" element={<LoginPage />} />

        {/* signup page */}
        <Route path="/signup" element={<Signup />} />

        {/* HOME PAGE */}
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <HomePage />             
              <Footer/>
            </>
          
          }
               
        />
        /*  Restaurants page */     
        <Route
        path="/restaurants"
        element={
          <>
          <Navbar/>
          <RestaurantsPage />
          <Footer/>         
          </>
        }
        />
        <Route      
  path="/restaurant/:id"
  element={
    <>
      <Navbar />
      <RestaurantDetails />
      <Footer />
    </>
  }
   />    
    {/*Night Deals Foods  */}
    <Route
   
  path="/nightdeals"
  element={
    <>
      <Navbar />
      <NightDeal />
      <Footer />
    </>
  }
/>

<Route
  path="/nightdeals/:id"
  element={
    <>
      <Navbar />
      <NightDeal />
      <Footer />
    </>
  }
/>
    {/* Home made fods */}
    <Route
    path="/homemade/:id"
    element={
      <>
      <Navbar />
      <HomeMadeFood />
      <Footer />
      </>
    }
    />
    <Route
  path="/homemade"
  element={
    <>
      <Navbar />
      <HomeMadeFood />
      <Footer />
    </>
  }
/>

     {/* Donate Page */}
     <Route
     path="/donate"
     element={
      <>
      <Navbar />
      <Donate />
      <Footer />
      </>
     }
     />
    {/* About Page */}
    <Route
    path="/about"
    element={      
      <>
      <Navbar />
      <About />
      <Footer />
      </>
    }
    />
    {/* Contact Info */}
    <Route
    path="/contact"
    element={      
      <>
      <Navbar />
      <Contact />
      <Footer />
      </>
    }
    />
    {/* Chatbot */}
    <Route
    path="/chatbot"
    element={
      <>
      <Navbar />
      <Chatbot />
      <Footer /> 
      </> 
    }
    />
    <Route path="/addfood" element={<AddFood />} />
    
    <Route
  path="/add-homemade-food"
  element={<AddHomeMadeFood />}
/>

{/* Admin section */}


{/* Admin pannel */}
<Route path="/admin" element={<AdminDashboard />} />
<Route
  path="/admin/restaurants"
  element={<RestaurantAdmin />}
/>
  <Route
  path="/admin/homemade-foods"
  element={<HomeFoodAdmin />}
/>
<Route 
path="/admin/nightdeals"
element={<NightDealsAdmin />} />

<Route
path="/admin/donations"
element={<DonationAdmin/>}/>

<Route
  path="/admin/volunteers"
  element={<VolunteerDashboard />}
/>

<Route
path="/notifications"
element={<NotificationPage/>}
/>



      </Routes>
    </Router>
    
  );
}

export default App;