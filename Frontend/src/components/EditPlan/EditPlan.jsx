import React, { useState, useEffect } from "react";
import './Edit.css'
const EditPlan = ({ planToEdit, onPlanUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    duration: "",
    userLimit: "",
  });

  useEffect(() => {
    if (planToEdit) {
      setFormData({
        name: planToEdit.name,
        price: planToEdit.price,
        description: planToEdit.description,
        duration: planToEdit.duration,
        userLimit: planToEdit.userLimit,
      });
    }
  }, [planToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePlan = async () => {
    try {
      const response = await fetch(
        `http://localhost:8100/create-plan/${planToEdit._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const updatedPlan = await response.json();
      onPlanUpdated(updatedPlan);
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  };

  return (
    <div>
      <h2>Edit Plan</h2>
     < div className="Edit-contanier">
     <div>
      <input 
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Plan Name"
      />
      </div>
     <div>
     <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        placeholder="Price"
      />
     </div>
      <div>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Description"
      />
      </div>
      <div>
      <input
        type="text"
        name="duration"
        value={formData.duration}
        onChange={handleInputChange}
        placeholder="Duration"
      />
      </div>
      
      <div>
      <input
        type="number"
        name="maxUsers"
        value={formData.maxUsers}
        onChange={handleInputChange}
        placeholder="Max Users"
      />
      </div>

     </div>
      <button onClick={handleUpdatePlan}>Update Plan</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditPlan;
