import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import "./NightDealsAdmin.css";

const API_URL =
"http://localhost:5194/api/Food/nightdeals";

const NightDealsAdmin = () => {
   const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
const [editDeal, setEditDeal] = useState(null);

  const [newDeal, setNewDeal] = useState({
    Name: "",
    imageUrl: "",
    originalPrice: "",
    discountedPrice: "",
    quantity: "",
    category: "",
    startTime: "",
    endTime: "",
    isActive: true
  });

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const res = await axios.get(API_URL);
      setDeals(res.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const addDeal = async () => {
  try {

    console.log(newDeal);

    await axios.post(API_URL, {
      ...newDeal,

      originalPrice: Number(newDeal.originalPrice),
      discountedPrice: Number(newDeal.discountedPrice),
      quantity: Number(newDeal.quantity),

      startTime: new Date(newDeal.startTime).toISOString(),
      endTime: new Date(newDeal.endTime).toISOString(),

      isActive: true
    });

    alert("Night Deal Added Successfully ✅");

    setNewDeal({
      foodName: "",
      restaurantName: "",
      imageUrl: "",
      originalPrice: "",
      discountedPrice: "",
      quantity: "",
      category: "",
      startTime: "",
      endTime: "",
      isActive: true
    });

    fetchDeals();

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data?.title ||
      err.response?.data ||
      err.message
    );
  }
};

const deleteDeal = async (id) => {
  if (!window.confirm("Delete this deal?")) return;

  try {
    await axios.delete(`${API_URL}/${id}`);
    fetchDeals();
  } catch (err) {
    console.log(err);
  }
};
const updateDeal = async (deal) => {

try {

await axios.put(
`${API_URL}/${deal.id}`,
{
...deal,

originalPrice:Number(deal.originalPrice),
discountedPrice:Number(deal.discountedPrice),
quantity:Number(deal.quantity)

}
);


alert("Deal Updated ✅");

fetchDeals();

setEditDeal(null);


}
catch(err){

console.log(err);

}

};
  return (
        <>
<AdminNavbar />
    <div className="night-admin">

      <div className="night-header">
        <h1>🌙 Night Deals Management</h1>
        <p>Create and manage discounted food deals</p>
      </div>

      <div className="add-night-card">

        <h2>Add Night Deal</h2>

        <input
          placeholder="Food Name"
          value={newDeal.Name}
          onChange={(e) =>
            setNewDeal({
              ...newDeal,
              name: e.target.value
            })
          }
        />
      
      <input
  placeholder="Restaurant Name"
  value={newDeal.restaurant}
  onChange={(e) =>
    setNewDeal({
      ...newDeal,
      restaurant: e.target.value
    })
  }
/>

        <input
          placeholder="Image URL"
          value={newDeal.imageUrl}
          onChange={(e) =>
            setNewDeal({
              ...newDeal,
              imageUrl: e.target.value
            })
          }
        />

        <input
          placeholder="Original Price"
          type="number"
          value={newDeal.originalPrice}
          onChange={(e) =>
            setNewDeal({
              ...newDeal,
              originalPrice: e.target.value
            })
          }
        />

        <input
          placeholder="Discount Price"
          type="number"
          value={newDeal.discountedPrice}
          onChange={(e) =>
            setNewDeal({
              ...newDeal,
              discountedPrice: e.target.value
            })
          }
        />

        <input
          placeholder="Quantity"
          type="number"
          value={newDeal.quantity}
          onChange={(e) =>
            setNewDeal({
              ...newDeal,
              quantity: e.target.value
            })
          }
        />

        <input
          placeholder="Category"
          value={newDeal.category}
          onChange={(e) =>
            setNewDeal({
              ...newDeal,
              category: e.target.value
            })
          }
        />

        <label>Start Time</label>
        <input
          type="datetime-local"
          value={newDeal.startTime}
          onChange={(e) =>
            setNewDeal({
              ...newDeal,
              startTime: e.target.value
            })
          }
        />

        <label>End Time</label>
        <input
          type="datetime-local"
          value={newDeal.endTime}
          onChange={(e) =>
            setNewDeal({
              ...newDeal,
              endTime: e.target.value
            })
          }
        />

        <button onClick={addDeal}>
          Add Deal
        </button>

      </div>

      <div className="night-grid">

        {deals.map((deal) => (

          <div className="night-card" key={deal.id}>

            <img
              src={deal.imageUrl}
              alt={deal.name}
            />

           <h3>{deal.name}</h3>

            <p>💰 ₹{deal.discountedPrice}</p>

            <p>
              <del>₹{deal.originalPrice}</del>
            </p>

            <p>🍱 {deal.quantity} Available</p>

            <p>📌 {deal.category}</p>

            <p>
              {deal.isActive
                ? "🟢 Active"
                : "🔴 Inactive"}
            </p>

            <div className="night-actions">

             <div className="night-actions">

<button
className="edit-btn"
onClick={() => setEditDeal({...deal})}
>
Edit
</button>


<button
className="delete-btn"
onClick={() => deleteDeal(deal.id)}
>
Delete
</button>

</div>

            </div>

          </div>
        ))}

      </div>
      </div>


{editDeal && (

<div className="modal-bg">

<div className="edit-modal">
  <button
className="modal-close"
onClick={() => setEditDeal(null)}
>
×
</button>

<h2>🌙 Edit Night Deal</h2>


<input
value={editDeal.name}
placeholder="Food Name"
onChange={(e)=>
setEditDeal({
...editDeal,
name:e.target.value
})
}
/>


<input
value={editDeal.restaurant}
placeholder="Restaurant"
onChange={(e)=>
setEditDeal({
...editDeal,
restaurant:e.target.value
})
}
/>


<input
value={editDeal.imageUrl}
placeholder="Image URL"
onChange={(e)=>
setEditDeal({
...editDeal,
imageUrl:e.target.value
})
}
/>


<img
src={editDeal.imageUrl}
className="preview-img"
/>


<input
type="number"
value={editDeal.originalPrice}
placeholder="Original Price"
onChange={(e)=>
setEditDeal({
...editDeal,
originalPrice:e.target.value
})
}
/>


<input
type="number"
value={editDeal.discountedPrice}
placeholder="Discount Price"
onChange={(e)=>
setEditDeal({
...editDeal,
discountedPrice:e.target.value
})
}
/>


<input
type="number"
value={editDeal.quantity}
placeholder="Quantity"
onChange={(e)=>
setEditDeal({
...editDeal,
quantity:e.target.value
})
}
/>


<input
value={editDeal.category}
placeholder="Category"
onChange={(e)=>
setEditDeal({
...editDeal,
category:e.target.value
})
}
/>


<div className="modal-buttons">


<button
className="save-btn"
onClick={()=>updateDeal(editDeal)}
>
Save
</button>


<button
className="delete-btn"
onClick={()=>setEditDeal(null)}
>
Cancel
</button>


</div>

</div>

</div>

)}



      

   
    
    </>
  );
};

export default NightDealsAdmin;