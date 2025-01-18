import React, { useState } from 'react'
import './CreatePlan.css'
import { useNavigate } from 'react-router-dom';
const CreatePlan = ({ onPlanCreated }) => {
    const [formData, setFormData] = useState({
      name: "",
      price: "",
      duration: "",
      userLimit: "",
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const navigate= useNavigate();
  
    const handleCreatePlan = async () => {
        const apiUrl="http://localhost:8100"
      const response = await fetch(`${apiUrl}/create-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newPlan = await response.json();
      if(newPlan.success){
        setFormData({ name: "", price: "", duration: "", userLimit: "" });
        navigate('/plans')
      }
      onPlanCreated(newPlan); // Pass the new plan to the parent
      setFormData({ name: "", price: "", duration: "", userLimit: "" });
    };
  
    return (
      <div>
        <h2>Create Plan</h2>
       <div className='create-container'>
       <input
       className='fields'
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Plan Name"
        />
        <input
        className='fields'
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
        />
        <input
        className='fields'
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          placeholder="Duration"
        />
        <input
        className='fields'
          type="number"
          name="userLimit"
          value={formData.userLimit}
          onChange={handleInputChange}
          placeholder="user limit"
        />
       </div>
        <button onClick={handleCreatePlan}>Add Plan</button>
      </div>
    );
  };
  
  export default CreatePlan;
