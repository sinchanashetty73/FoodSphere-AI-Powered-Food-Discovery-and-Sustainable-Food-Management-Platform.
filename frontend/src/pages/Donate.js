import React, { useState,useEffect } from "react";
import { createDonation } from "../api/donationApi";
import {
  createIndividualDonation,
  createRestaurantDonation,
  createEventDonation,
  createGroceryDonation
} from "../api/donationApi";
import axios from "axios";
import "./DonationTracking";
import "./Donate.css";




const Donate = () => {
  
const [trackingData, setTrackingData] = useState([]);
const [loadingTracking, setLoadingTracking] = useState(true);
useEffect(() => {
  fetchTrackingData();
}, []);

const fetchTrackingData = async () => {
  try {
    const res = await axios.get(
      "https://foodsphere-api.onrender.com/api/DonationTracking"
    );

    setTrackingData(res.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingTracking(false);
  }
};
const getProgress = (status) => {
  switch (status) {
    case "Submitted":
      return 1;

    case "Accepted":
      return 2;

    case "VolunteerAssigned":
      return 3;

    case "Picked Up":
      return 4;

    case "Delivered":
      return 5;

    default:
      return 0;
  }
};
  const [donations, setDonations] = useState([
    {
      id: 1,
      title: "City Homeless Shelter",
      desc: "Evening meal sponsorship for homeless individuals",
      target: 150,
      current: 85,
      location: "Downtown",
      image:
        "https://i.pinimg.com/1200x/68/3f/ad/683fad74a2780f1e9ffb6d7ad0301de4.jpg",
    },
    {
      id: 2,
      title: "Children's Hope Foundation",
      desc: "Nutritious meals for underprivileged children",
      target: 80,
      current: 50,
      location: "Mission Area",
      image:
        "https://i.pinimg.com/1200x/da/3a/cd/da3acdc19723213b28cf3878c85a3eb7.jpg",
    },
  ]);

  // Impcts
  

  const [donationForm, setDonationForm] = useState({
  donorName: "",
  email: "",
  phoneNumber: "",
  donationType: "Food",
  foodName: "",
  quantity: 0,
  pickupAddress: ""
});
const [individualForm, setIndividualForm] = useState({
  donorName: "",
  email: "",
  phoneNumber: "",
  foodName: "",
  quantity: 0,
  foodCondition: "",
   PickupLocation: "",
  pickupTime: ""
});
const [restaurantForm, setRestaurantForm] = useState({
  restaurantName: "",
  ownerName: "",
   contactNumber: "",
  email: "",
  foodCategory: "",
  quantity: 0,
  foodCondition: "",
  pickupAddress: "",
  pickupTime: ""
});

const [eventForm, setEventForm] = useState({
  eventName: "",
  organizerName: "",
contactNumber: "",
  email: "",
  foodType: "",
  quantity: 0,
  pickupAddress: "",
  pickupTime: ""
});

const [groceryForm, setGroceryForm] = useState({
  donorName: "",
  contactNumber: "",
  itemName: "",
  quantity: 0,
  expiryDate: "",
  pickupAddress: ""
});

const [showModal, setShowModal] = useState(false);
const [donationType, setDonationType] = useState("");

const openDonationForm = (type) => {
  setDonationType(type);
  setShowModal(true);
};

const closeDonationForm = () => {
  setShowModal(false);
};

  const handleChange = (e) => {
  setDonationForm({
    ...donationForm,
    [e.target.name]: e.target.value
  });
};

  const handleDonate = (id, meals) => {
    const updated = donations.map((item) =>
      item.id === id
        ? { ...item, current: item.current + meals }
        : item
    );
    setDonations(updated);
  };
  const handleSubmitDonation = async (e) => {
  e.preventDefault();

  try {
    await createDonation(donationForm);

    alert("Donation submitted successfully!");

    setDonationForm({
      donorName: "",
      email: "",
      phoneNumber: "",
      donationType: "Food",
      foodName: "",
      quantity: 0,
      pickupAddress: ""
    });
  } catch (error) {
    console.error(error);
    alert("Failed to submit donation");
  }
};

// const submitIndividualDonation = async (e) => {
//   e.preventDefault();
//   console.log(JSON.stringify(individualForm, null, 2));

//   try {
    
//     await createIndividualDonation(individualForm);

//     alert("Donation Submitted Successfully");

//     setShowModal(false);

//     setIndividualForm({
//       donorName: "",
//       email: "",
//       phoneNumber: "",
//       foodName: "",
//       quantity: 0,
//       foodCondition: "",
//       pickupAddress: "",
//       pickupTime: ""
//     });
//   } catch (error) {
//   console.error("FULL ERROR:", error);

//   if (error.response) {
//     console.log("Status:", error.response.status);
//     console.log("Data:", error.response.data);
//   }

//   alert("Failed to Submit Donation");
// }
// };
const submitIndividualDonation = async (e) => {
  e.preventDefault();

  const dataToSend = {
    ...individualForm,
    pickupTime: individualForm.pickupTime
      ? new Date(individualForm.pickupTime).toISOString()
      : null
  };

  console.log("Sending Data:");
  console.log(JSON.stringify(dataToSend, null, 2));

  try {
    await createIndividualDonation(dataToSend);

    alert("Donation Submitted Successfully");

    setShowModal(false);

    setIndividualForm({
      donorName: "",
      email: "",
      phoneNumber: "",
      foodName: "",
      quantity: 0,
      foodCondition: "",
      pickupAddress: "",
      pickupTime: ""
    });
  } catch (error) {
    console.error("FULL ERROR:", error);

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
    }

    alert("Failed to Submit Donation");
  }
};

//   console.log("Sending Data:");
//   console.log(JSON.stringify(dataToSend, null, 2));

//   try {
//     await createIndividualDonation(dataToSend);

//     alert("Donation Submitted Successfully");

//     setShowModal(false);

//     setIndividualForm({
//       donorName: "",
//       email: "",
//       phoneNumber: "",
//       foodName: "",
//       quantity: 0,
//       foodCondition: "",
//       pickupAddress: "",
//       pickupTime: ""
//     });
//   } catch (error) {
//     console.error("FULL ERROR:", error);

//     if (error.response) {
//       console.log("Status:", error.response.status);
//       console.log("Data:", error.response.data);
//     }

//     alert("Failed to Submit Donation");
//   }
// };
const submitRestaurantDonation = async (e) => {
  e.preventDefault();

  try {
    await createRestaurantDonation(restaurantForm);

    alert("Restaurant Donation Submitted Successfully");

    setShowModal(false);
  } catch (error) {
    console.error(error);
    alert("Failed to submit restaurant donation");
  }
};

  

const submitGroceryDonation = async (e) => {
  e.preventDefault();

  console.log(groceryForm);

  try {
    const response =
      await createGroceryDonation(groceryForm);

    console.log(response);

    alert("Grocery Donation Submitted Successfully");
  }
  catch(error){
    console.error(error);
  }
};

const submitEventDonation = async (e) => {
  e.preventDefault();

  try {
    await createEventDonation(eventForm);

    alert("Event Donation Submitted Successfully");

    setShowModal(false);
  } catch (error) {
    console.error(error);
    alert("Failed to submit event donation");
  }
};
const [mealCounts, setMealCounts] = useState({});


const handleMealDonation = async (requestId) => {
  const mealCount = mealCounts[requestId];
  

if (!mealCount || mealCount <= 0){
    alert("Please enter number of meals");
    return;
  }
  

  try {
    const donatedMeals = parseInt(mealCount);

    await axios.post(
      "https://foodsphere-api.onrender.com/api/MealDonations",
      {
        donationRequestId: requestId,
        mealsDonated: donatedMeals
      }
    );

    // Update UI instantly
    setDonations(prev =>
      prev.map(item =>
        item.id === requestId
          ? {
              ...item,
              current: item.current + donatedMeals
            }
          : item
      )
    );

    setMealCounts("");

    alert("Thank you for your donation!");
  } catch (error) {
    console.error(error);
    alert("Donation failed");
  }
};

// donations tracking
const removeDonation = (id) => {
  if (!window.confirm("Remove this donation?")) return;

  setTrackingData((prev) =>
    prev.filter((item) => item.id !== id)
  );
};

  return (
    <div className="donate-page">
      <h1>Donate Meals</h1>
      <h4> Sponsor meals for underprivileged communities and make a difference.</h4>

      {/* HERO */}
      <div className="hero">
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1593113630400-ea4288922497"
            alt=""
          />
        </div>

        <div className="hero-content">
          <h2>❤️ Make a Difference Today</h2>
          <p>
            Your donation provides nutritious meals to those in need.
            Every meal counts and helps build a better community.
          </p>

          <div className="stats">
            <div>
              <h3>12,450</h3>
              <p>Meals Donated</p>
            </div>
            <div>
              <h3>1,890</h3>
              <p>Active Donors</p>
            </div>
            <div>
              <h3>45</h3>
              <p>Organizations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="donation-form-section">
  <h2>Donate Food</h2>

  <div className="donation-types">

  <div className="type-card"
  onClick={() => openDonationForm("individual")}>
    <div className="donation-icon"
     
    >🏠</div>
      
      <h3>Individual Donation</h3>
      <p>Home-cooked meals,packaged food,or surplus groceries from your househlods.</p>
      <span>Most Common</span>
  </div>

  <div className="type-card"
  onClick={() => openDonationForm("restaurant")}>
    <div className="donation-icon">🏪</div>
      
      <h3>Restaurant Donation</h3>
      <p>Daily Surplus food,unsold meals and prepared dishes from restaurants.</p>
      <span>High Impact</span>
  </div>

  <div className="type-card"
  onClick={() => openDonationForm("event")}>
    <div className="donation-icon"
    >🎉</div>
      
      <h3>Event / Wedding</h3>
      <p>Post-event food,wedding catering leftovers and Large gathering surplus.</p>
      <span>Large Volume</span>
  </div>

  <div className="type-card"
  onClick={() => openDonationForm("grocery")}>
      <div className="donation-icon">🛒</div>
      <h3>Grocery Donation</h3>
      <p>Fruits,vegetables,grains and Packaged foods near expiry.</p>
      <span>Shelf Stable</span>
  </div>

</div>
</div>

      {/* ACTIVE REQUESTS */}
      <h1 className="section-title">Active Donation Requests</h1>

      <div className="card-grid">
        {donations.map((item) => {
          const progress = (item.current / item.target) * 100;

          return (
            <div className="donation-card" key={item.id}>

              {/* IMAGE FIXED */}
              <div className="image-box">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="card-body">
                <div className="title-row">
                  <h3>{item.title}</h3>
                  <span className="location">📍 {item.location}</span>
                </div>

                <p>{item.desc}</p>
                <p>👥 Target: {item.target} people</p>

                {/* PROGRESS */}
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <p>
                  {item.current} / {item.target} meals
                </p>

                <p className="remaining">
                  {item.target - item.current} meals still needed
                </p>

                {/* INPUT */}
                <div className="donate-input">
             <input
  type="number"
  placeholder="Number of meals"
  value={mealCounts[item.id] || ""}
  onChange={(e) =>
    setMealCounts({
      ...mealCounts,
      [item.id]: e.target.value
    })
  }
/>
                  <button
  disabled={item.current >= item.target}
  onClick={() => handleMealDonation(item.id)}
>
  {item.current >= item.target
    ? "Target Reached"
    : "❤️ Donate"}
</button>
                </div>

                {/* QUICK BUTTONS */}
                <div className="meal-buttons">
                  <button
  onClick={() =>
    setMealCounts({
      ...mealCounts,
      [item.id]: 5
    })
  }
>
  5 meals
</button>
<button
  onClick={() =>
    setMealCounts({
      ...mealCounts,
      [item.id]: 10
    })
  }
>
  10 meals
</button>

<button
  onClick={() =>
    setMealCounts({
      ...mealCounts,
      [item.id]: 25
    })
  }
>
  25 meals
</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Donations Tracking */}
      
        <div className="tracking-section">

  <h2>📦 My Donation Tracking</h2>

  {loadingTracking ? (
    <p>Loading...</p>
  ) : trackingData.length === 0 ? (

    <div className="empty-tracking">
      <h3>No Donations Yet</h3>
      <p>
        Your donation history and tracking details
        will appear here.
      </p>
    </div>

  ) : (

    trackingData.map((item) => {

      const progress = getProgress(item.status);

      return (
        <div
          className="tracking-card"
          key={item.id}
        >
          <button
  className="remove-card-btn"
  onClick={() => removeDonation(item.id)}
>
  ✖
</button>
          <div className="tracking-header">

            <div>
              <h3>
                🍱 Donation #{item.trackingId}
              </h3>

              <p>
                Last Updated :
                {new Date(
                  item.updatedAt
                ).toLocaleString()}
              </p>
            </div>

            <span className="status-badge">
              {item.status}
            </span>

          </div>

          <div className="tracking-info">

            <div>
              <h4>Food Details</h4>

{/* Individual */}
{item.donationType === "Individual" && (
  <>
    <p>
      <strong>Donor :</strong> {item. donorName}
    </p>

    <p>
      <strong>Phone :</strong> {item.phoneNumber}
    </p>

    <p>
      <strong>Food :</strong> {item.foodName}
    </p>
  </>
)}

{/* Restaurant */}
{item.donationType === "Restaurant" && (
  <>
    <p>
      <strong>Restaurant :</strong> {item.restaurantName}
    </p>

    <p>
      <strong>Phone :</strong> {item.phoneNumber}
    </p>

    <p>
      <strong>Food Category :</strong> {item.foodName}
    </p>
    
    <p>
      <strong>Donation Type :</strong> {item.donationType}
    </p>
  </>
)}

{/* Event */}
{item.donationType === "Events" && (
  <>
    <p>
      <strong>Organizer :</strong> {item.donorName}
    </p>

    <p>
      <strong>Phone :</strong> {item.phoneNumber}
    </p>

    <p>
      <strong>Food Type :</strong> {item.foodName}
    </p>
    <p>
      <strong>Donation Type :</strong> {item.donationType}
    </p>

  </>
)}

{/* Grocery */}
{item.donationType === "Grousery" && (
  <>
    <p>
      <strong>Donor :</strong> {item.donorName}
    </p>

    <p>
      <strong>Phone :</strong> {item.phoneNumber}
    </p>

    <p>
      <strong>Food :</strong> {item.foodName}
    </p>
    <p>
      <strong>Donation Type :</strong> {item.donationType}
    </p>
  </>
)}

<p>
  <strong>Quantity :</strong> {item.quantity}
</p>
            </div>

            <div>
              <h4>Route Details</h4>

              <p>
                📍 Pickup :
                {item.pickupLocation}
              </p>

              <p>
                🏢 NGO :
                {item.destination}
              </p>

                        <p>
            🚚 Volunteer :
            {item.volunteerName || "Not Assigned"}
          </p>

          <p>
            📞 Contact :
            {item.volunteerPhone || "-"}
          </p>
            </div>

          </div>

          <div className="timeline">

            <div
              className={`step ${
                progress >= 1 ? "active" : ""
              }`}
            >
              ✓
            </div>

            <div
              className={`line ${
                progress >= 2 ? "active" : ""
              }`}
            ></div>

            <div
              className={`step ${
                progress >= 2 ? "active" : ""
              }`}
            >
              ✓
            </div>

            <div
              className={`line ${
                progress >= 3 ? "active" : ""
              }`}
            ></div>

            <div
              className={`step ${
                progress >= 3 ? "active" : ""
              }`}
            >
              ✓
            </div>

            <div
              className={`line ${
                progress >= 4 ? "active" : ""
              }`}
            ></div>

            <div
              className={`step ${
                progress >= 4 ? "active" : ""
              }`}
            >
              ✓
            </div>

            <div
              className={`line ${
                progress >= 5 ? "active" : ""
              }`}
            ></div>

            <div
              className={`step ${
                progress >= 5 ? "active" : ""
              }`}
            >
              ✓
            </div>

          </div>

          <div className="timeline-labels">
            <span>Submitted</span>
            <span>Accepted</span>
            <span>Volunteer</span>
            <span>Picked Up</span>
            <span>Delivered</span>
          </div>

        </div>
      );
    })
  )}
</div>

      {/* IMPACT */}
      <div className="testimonials-section">

      <div className="testimonials-header">
    <div>
      <h2>❤️ Voices of Hope</h2>
    </div>

    <p>
      Real stories from donors, volunteers, NGOs and beneficiaries who are
      making a difference through FoodSphere AI.
    </p>
  </div>
     <div className="impact-grid">
  <div className="feedback-card">

    <div className="stars">★★★★★</div>

    <p className="feedback-text">
      "FoodSphere AI made donating food effortless. Instead of wasting
      leftover food after our family function, it reached families in need
      within hours. The tracking feature gave us complete confidence."
    </p>

    <div className="feedback-user">
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="Priya"
      />

      <div>
        <h4>Priya Sharma</h4>
        <span>Food Donor</span>
      </div>
    </div>

  </div>


  <div className="feedback-card">

    <div className="stars">★★★★★</div>

    <p className="feedback-text">
      "Our NGO receives donations much faster using FoodSphere AI.
      Volunteer coordination and live tracking have helped us reduce food
      waste while serving more families every day."
    </p>

    <div className="feedback-user">
      <img
        src="https://randomuser.me/api/portraits/men/36.jpg"
        alt="Rahul"
      />

      <div>
        <h4>Rahul Verma</h4>
        <span>NGO Coordinator</span>
      </div>
    </div>

  </div>


  <div className="feedback-card">

    <div className="stars">★★★★★</div>

    <p className="feedback-text">
      "I received fresh meals during a difficult time. The volunteers were
      very kind, and the food arrived safely. Thank you to everyone who
      donated through FoodSphere AI."
    </p>

    <div className="feedback-user">
      <img
        src="https://randomuser.me/api/portraits/women/68.jpg"
        alt="Lakshmi"
      />

      <div>
        <h4>Lakshmi Devi</h4>
        <span>Beneficiary</span>
      </div>
    </div>

  </div>

</div>
</div>

     {
  showModal && (
    <div className="modal-overlay">
      <div className="modal-box">

        <button
          className="close-btn"
          onClick={closeDonationForm}
        >
          ✖
        </button>

        {donationType === "individual" && (

<form onSubmit={submitIndividualDonation}>

<h2>🏠 Individual Donation</h2>

<input
placeholder="Donor Name"
value={individualForm.donorName}
onChange={(e)=>
setIndividualForm({
...individualForm,
donorName:e.target.value
})
}
/>

<input
placeholder="Email"
value={individualForm.email}
onChange={(e)=>
setIndividualForm({
...individualForm,
email:e.target.value
})
}
/>

<input
placeholder="Phone Number"
value={individualForm.phoneNumber}
onChange={(e)=>
setIndividualForm({
...individualForm,
phoneNumber:e.target.value
})
}
/>

<input
placeholder="Food Name"
value={individualForm.foodName}
onChange={(e)=>
setIndividualForm({
...individualForm,
foodName:e.target.value
})
}
/>

<input
type="number"
placeholder="Quantity"
value={individualForm.quantity}
onChange={(e)=>
setIndividualForm({
...individualForm,
quantity:Number(e.target.value)
})
}
/>

<input
placeholder="Food Condition"
value={individualForm.foodCondition}
onChange={(e)=>
setIndividualForm({
...individualForm,
foodCondition:e.target.value
})
}
/>

<textarea
placeholder="Pickup Address"
value={individualForm.pickupAddress}
onChange={(e)=>
setIndividualForm({
...individualForm,
pickupAddress:e.target.value
})
}
/>

<input
type="datetime-local"
value={individualForm.pickupTime}
onChange={(e)=>
setIndividualForm({
...individualForm,
pickupTime:e.target.value
})
}
/>

<button type="submit">
Submit Donation
</button>

</form>

)}

        {donationType === "restaurant" && (
<form onSubmit={submitRestaurantDonation}>

<h2>🏪 Restaurant Donation</h2>

<input
  placeholder="Restaurant Name"
  value={restaurantForm.restaurantName}
  onChange={(e) =>
    setRestaurantForm({
      ...restaurantForm,
      restaurantName: e.target.value
    })
  }
/>

<input
  placeholder="Owner Name"
  value={restaurantForm.ownerName}
  onChange={(e) =>
    setRestaurantForm({
      ...restaurantForm,
      ownerName: e.target.value
    })
  }
/>

<input
  placeholder="Phone Number"
  value={restaurantForm.contactNumber}
onChange={(e) =>
  setRestaurantForm({
    ...restaurantForm,
    contactNumber: e.target.value
  })
}
/>

<input
  placeholder="Email"
  value={restaurantForm.email}
  onChange={(e) =>
    setRestaurantForm({
      ...restaurantForm,
      email: e.target.value
    })
  }
/>

<input
  placeholder="Food Type"
  value={restaurantForm.foodCategory}
onChange={(e) =>
  setRestaurantForm({
    ...restaurantForm,
    foodCategory: e.target.value
  })
}
/>

<input
  type="number"
  placeholder="Quantity"
  value={restaurantForm.quantity}
  onChange={(e) =>
    setRestaurantForm({
      ...restaurantForm,
      quantity: Number(e.target.value)
    })
  }
/>

<input
  placeholder="Food Condition"
  value={restaurantForm.foodCondition}
  onChange={(e) =>
    setRestaurantForm({
      ...restaurantForm,
      foodCondition: e.target.value
    })
  }
/>

<textarea
  placeholder="Pickup Address"
  value={restaurantForm.pickupAddress}
  onChange={(e) =>
    setRestaurantForm({
      ...restaurantForm,
      pickupAddress: e.target.value
    })
  }
/>

<input
  type="datetime-local"
  value={restaurantForm.pickupTime}
  onChange={(e) =>
    setRestaurantForm({
      ...restaurantForm,
      pickupTime: e.target.value
    })
  }
/>

<button type="submit">
  Submit Donation
</button>

</form>


)}

    {donationType === "event" && (

<form onSubmit={submitEventDonation}>

<h2>🎉 Event Donation</h2>

<input
  placeholder="Event Name"
  value={eventForm.eventName}
  onChange={(e) =>
    setEventForm({
      ...eventForm,
      eventName: e.target.value
    })
  }
/>

<input
  placeholder="Organizer Name"
  value={eventForm.organizerName}
  onChange={(e) =>
    setEventForm({
      ...eventForm,
      organizerName: e.target.value
    })
  }
/>

<input
  placeholder="Phone Number"
  value={eventForm.contactNumber}
  onChange={(e) =>
    setEventForm({
      ...eventForm,
      contactNumber: e.target.value
    })
  }
/>

<input
  placeholder="Email"
  value={eventForm.email}
  onChange={(e) =>
    setEventForm({
      ...eventForm,
      email: e.target.value
    })
  }
/>

<input
  placeholder="Food Type"
  value={eventForm.foodType}
  onChange={(e) =>
    setEventForm({
      ...eventForm,
      foodType: e.target.value
    })
  }
/>

<input
  type="number"
  placeholder="Quantity"
  value={eventForm.quantity}
  onChange={(e) =>
    setEventForm({
      ...eventForm,
      quantity: e.target.value
    })
  }
/>

<textarea
  placeholder="Pickup Address"
  value={eventForm.pickupAddress}
  onChange={(e) =>
    setEventForm({
      ...eventForm,
      pickupAddress: e.target.value
    })
  }
/>

<input
  type="datetime-local"
  value={eventForm.eventDate}
  onChange={(e) =>
    setEventForm({
      ...eventForm,
      eventDate: e.target.value
    })
  }
/>

<button type="submit">
  Submit Donation
</button>

</form>

)}

       {donationType === "grocery" && (

<form onSubmit={submitGroceryDonation}>

<h2>🛒 Grocery Donation</h2>

<input
placeholder="Donor Name"
value={groceryForm.donorName}
onChange={(e)=>
setGroceryForm({
...groceryForm,
donorName:e.target.value
})
}
/>

<input
placeholder="Contact Number"
value={groceryForm.contactNumber}
onChange={(e)=>
setGroceryForm({
...groceryForm,
contactNumber:e.target.value
})
}
/>

<input
placeholder="Item Name"
value={groceryForm.itemName}
onChange={(e)=>
setGroceryForm({
...groceryForm,
itemName:e.target.value
})
}
/>

<input
type="number"
placeholder="Quantity"
value={groceryForm.quantity}
onChange={(e)=>
setGroceryForm({
...groceryForm,
quantity:Number(e.target.value)
})
}
/>

<input
type="date"
value={groceryForm.expiryDate}
onChange={(e)=>
setGroceryForm({
...groceryForm,
expiryDate:e.target.value
})
}
/>

<textarea
placeholder="Pickup Address"
value={groceryForm.pickupAddress}
onChange={(e)=>
setGroceryForm({
...groceryForm,
pickupAddress:e.target.value
})
}
/>

<button type="submit">
Submit Donation
</button>

</form>

)}

      </div>
    </div>
  )
}

    </div>
  );
};

export default Donate;