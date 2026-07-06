import React,
{
 useEffect,
 useState
}
from "react";

import axios from "axios";

const DonationTracking = () => {

 const [donations,
 setDonations] =
 useState([]);

 const removeDonation = (id) => {
  if (!window.confirm("Remove this donation card?")) return;

  setDonations((prev) =>
    prev.filter((item) => item.id !== id)
  );
};

 useEffect(() => {

 axios
 .get(
  "https://foodsphere-api.onrender.com/api/DonationTracking"
 )
 .then(res =>
 setDonations(res.data));

 }, []);

return (
  <div>

    <h1>Donation Tracking</h1>

    {donations.map(d => (

      <div key={d.id} className="tracking-card">

         <button
    className="remove-card-btn"
    onClick={() => removeDonation(d.id)}
  >
    ✖
  </button>

        <h3>
          Donation #{d.trackingId}
        </h3>

        {/* Individual Donation */}
        {d.donationType === "Individual" && (
          <>
            <p>
              <strong>Donor:</strong> {d.donorName}
            </p>

            <p>
              <strong>Phone:</strong> {d.phoneNumber}
            </p>
          </>
        )}

        {/* Restaurant Donation */}
        {d.donationType === "Restaurant" && (
          <>
            <p>
              <strong>Restaurant:</strong> {d.restaurantName}
            </p>

            <p>
              <strong>Phone:</strong> {d.phoneNumber}
            </p>
          </>
        )}

        {/* Event Donation */}
        {d.donationType === "Event" && (
          <>

                <p>
            <strong>Event:</strong> {d.eventName}
          </p>
            <p>
              <strong>Organizer:</strong> {d.donorName}
            </p>

            <p>
              <strong>Phone:</strong> {d.phoneNumber}
            </p>
          </>
        )}

        {/* Grocery Donation */}
        {d.donationType === "Grocery" && (
          <>
            <p>
              <strong>Donor:</strong> {d.donorName}
            </p>

            <p>
              <strong>Phone:</strong> {d.phoneNumber}
            </p>
          </>
        )}

       <p>
  <strong>
    {d.donationType === "Restaurant"
      ? "Food Category"
      : d.donationType === "Event"
      ? "Food Type"
      : "Food"}
    :
  </strong>
  {" "}
  {d.foodName}
</p>

        <p>
          <strong>Quantity:</strong> {d.quantity}
        </p>

        <p>
          <strong>Pickup:</strong> {d.pickupLocation}
        </p>

        <p>
          <strong>Status:</strong> {d.status}
        </p>
      <p>
  <strong>Volunteer:</strong>{" "}
  {d.volunteerName || "Not Assigned"}
</p>

<p>
  <strong>Volunteer Contact:</strong>{" "}
  {d.volunteerPhone || "-"}
</p>

      </div>

    ))}

  </div>
);
};

export default DonationTracking;