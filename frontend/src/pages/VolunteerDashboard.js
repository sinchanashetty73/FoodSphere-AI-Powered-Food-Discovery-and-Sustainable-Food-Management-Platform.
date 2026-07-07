import React, { useEffect, useState } from "react";
import AdminNavbar from "./../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import "./VolunteerDashboard.css";
import axios from "axios";

const VolunteerDashboard = () => {
  const [donations, setDonations] = useState([]);
   const navigate = useNavigate();
  const [showModal, setShowModal] =
  useState(false);

const [selectedDonation, setSelectedDonation] =
  useState(null);

const [volunteerName, setVolunteerName] =
  useState("");

const [volunteerPhone, setVolunteerPhone] =
  useState("");


  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/DonationTracking`
      );

      setDonations(res.data);
    } catch (error) {
      console.error(error);
    }
  };

 const openVolunteerModal = (id) => {
  setSelectedDonation(id);
  setShowModal(true);
};

const assignVolunteer = async (id) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_API_URL}/api/Volunteers/${id}/assign-volunteer`,
      {
        volunteerName,
        volunteerPhone
      }
    );

    alert("Volunteer Assigned Successfully");

    setShowModal(false);

    setVolunteerName("");
    setVolunteerPhone("");

    loadDonations();

  } catch (error) {
    console.error(error);
    alert("Failed to assign volunteer");
  }
};

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/DonationTracking/${id}/status`,
        JSON.stringify(status),
        {
          headers: {
            "Content-Type":
              "application/json"
          }
        }
      );

      loadDonations();
    } catch (error) {
      console.error(error);
    }
  };

  return (
        <>
<AdminNavbar />
   <div className="volunteer-container">
      <h1 className="volunteer-title">
  🚚 Volunteer Dashboard
</h1>

      {donations.map((d) => (
       <div className="volunteer-card" key={d.id}>
          <h3>
            Donation #{d.trackingId}
          </h3>

          <p>
            <strong>Type:</strong>{" "}
            {d.donationType}
          </p>

          <p>
            <strong>Donor:</strong>{" "}
            {d.donorName}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {d.phoneNumber}
          </p>

          <p>
            <strong>Food:</strong>{" "}
            {d.foodName}
          </p>

          <p>
            <strong>Quantity:</strong>{" "}
            {d.quantity}
          </p>

          <p>
            <strong>Pickup:</strong>{" "}
            {d.pickupLocation}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {d.status}
          </p>

          <p>
            <strong>Volunteer:</strong>{" "}
            {d.volunteerName ||
              "Not Assigned"}
          </p>

          <div
              className="button-group"
            style={{
              marginTop: "10px"
            }}
          >
            {!d.volunteerAssigned && (
              <button
              className="assign-btn"
                onClick={() =>
                openVolunteerModal(d.id)
}
              >
                Assign Volunteer
              </button>
            )}

            <button
            className="accept-btn"
              onClick={() =>
                updateStatus(
                  d.id,
                  "Accepted"
                )
              }
            >
              Accept
            </button>

            <button
            className="pickup-btn"
              onClick={() =>
                updateStatus(
                  d.id,
                  "Picked Up"
                )
              }
            >
              Picked Up
            </button>

            <button
            className="delivered-btn"
              onClick={() =>
                updateStatus(
                  d.id,
                  "Delivered"
                )
              }
            >
              Delivered
            </button>
          </div>
        </div>
      ))}
      {showModal && (

<div className="modal-overlay">

  <div className="volunteer-modal">

    <h2>
      🚚 Assign Volunteer
    </h2>

    <input
      type="text"
      placeholder="Volunteer Name"
      value={volunteerName}
      onChange={(e) =>
        setVolunteerName(e.target.value)
      }
    />

    <input
      type="text"
      placeholder="Phone Number"
      value={volunteerPhone}
      onChange={(e) =>
        setVolunteerPhone(e.target.value)
      }
    />

    <div className="modal-buttons">

    <button
  className="save-btn"
  onClick={() =>
    assignVolunteer(selectedDonation)
  }
>
  Assign
</button>

      <button
        className="cancel-btn"
        onClick={() =>
          setShowModal(false)
        }
      >
        Cancel
      </button>

    </div>

  </div>

</div>

)}
    </div>
    </>
  );
};

export default VolunteerDashboard;