import React,
{
  useEffect,
  useState
}
from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

import axios from "axios";

import "./DonationAdmin.css";

const DonationAdmin = () => {
   const navigate = useNavigate();

  const [donations,
    setDonations] =
      useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations =
    async () => {

      const res =
        await axios.get(
          "https://foodsphere-api.onrender.com/api/DonationTracking"
        );
         console.log(res.data);
      setDonations(res.data);
    };

  const updateStatus =
    async (id, status) => {

     await axios.put(
  `https://foodsphere-api.onrender.com/api/DonationTracking/${id}/status`,
  JSON.stringify(status),
  {
    headers: {
      "Content-Type": "application/json"
    }
  }
);

      fetchDonations();
    };

  return (
        <>
<AdminNavbar />
    <div
      className="donation-admin">

      <h1>
        Donation Management
      </h1>

      {donations.map(
        donation => (


<div
  className="donations-card"
  key={donation.id}
>
  <h2>{donation.foodName}</h2>

  <p>
    <strong>Donor:</strong>
    {" "}{donation.donorName}
  </p>

  <p>
    <strong>Phone:</strong>
    {" "}{donation.phoneNumber}
  </p>

  <p>
    <strong>Quantity:</strong>
    {" "}{donation.quantity}
  </p>

  
   <p>
  <strong>Pickup:</strong> {donation.pickupLocation}
</p>

  <p>
    <strong>Status:</strong>
    {" "}{donation.status}
  </p>

  <button
    onClick={() =>
      updateStatus(
        donation.id,
        "Accepted"
      )
    }
  >
    Accept
  </button>

  <button
    onClick={() =>
      updateStatus(
        donation.id,
        "Picked Up"
      )
    }
  >
    Picked Up
  </button>

  <button
    onClick={() =>
      updateStatus(
        donation.id,
        "Delivered"
      )
    }
  >
    Delivered
  </button>
</div>
      ))}
    </div>
    </>
  );
};

export default DonationAdmin;