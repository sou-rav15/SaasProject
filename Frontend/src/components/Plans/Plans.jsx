import React, { useState } from "react";
import "./Plans.css";
import { useAuth } from "../Authentication/Authenticaton";
import Login from "../login/Login";
import {loadStripe} from '@stripe/stripe-js';
import EditPlan from "../EditPlan/EditPlan";
import { useNavigate } from "react-router-dom";
function Plans() {
  const [isEdit, setIsEdit]= useState(false);
  const [currplan, setPlan]=useState({});
     const {  isAuthenticated, login, logout } = useAuth();
  const plans = [
    {
      name: "Basic",
      price: 0, // Free
      description: "Limited to 1 user.",
      duration: "1 day",
      maxUsers: 1,
    },
    {
      name: "Standard",
      price: 4999, // Price in smallest currency unit (e.g., ₹4999/year/user)
      description: "Up to 5 users.",
      duration:" 6 months",
      maxUsers: 5,
    },
    {
      name: "Plus",
      price: 3999, // Price in smallest currency unit (e.g., ₹3999/year/user)
      description: "For more than 10 users.",
      duration:'1 year',
      maxUsers: 10,
    },
  ];
  const [pricing, setPricing] = useState(plans);
  const navigate= useNavigate();
  // State to manage user counts for each plan
  const [userCounts, setUserCounts] = useState(
    plans.reduce((acc, plan) => ({ ...acc, [plan.name]: 1 }), {})
  );

  // State to manage cart
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  // Increment user count for a plan
  const handleIncrement = (plan) => {
    setUserCounts((prevCounts) => {
      if (prevCounts[plan.name] < plan.maxUsers) {
        return { ...prevCounts, [plan.name]: prevCounts[plan.name] + 1 };
      }
      return prevCounts;
    });
  };

  // Decrement user count for a plan
  const handleDecrement = (plan) => {
    setUserCounts((prevCounts) => {
      if (prevCounts[plan.name] > 1) {
        return { ...prevCounts, [plan.name]: prevCounts[plan.name] - 1 };
      }
      return prevCounts;
    });
  };

  // Add plan to cart
  const addToCart = (plan) => {
    setCart((prevCart) => {
      const existingPlan = prevCart.find((item) => item.name === plan.name);
      if (existingPlan) {
        // Update the user count for the existing plan in the cart
        return prevCart.map((item) =>
          item.name === plan.name
            ? { ...item, userCount: userCounts[plan.name] }
            : item
        );
      }
      // Add new plan to the cart
      return [...prevCart, { ...plan, userCount: userCounts[plan.name] }];
    });
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.userCount,
      0
    );
  };

  const handleCheckout = async () => {
    const apiUrl = import.meta.env.VITE_API_KEY; 
    const stripe = await loadStripe(apiUrl);
  
    const headers={"content-Type":'application/json'}
    const response = await fetch(`http://localhost:8100/checkout-payment` ,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
         cart,
      }),
    });

    const session= await response.json();
    console.log('session', session)
    const result =stripe.redirectToCheckout({sessionId:session.id})
   if(result.error){
    console.log(result.errror);
   }
};
const handleEdit = (plan) => {
  setPlan(plan);
  setIsEdit(true);
};

const updatePlanInList = (updatedPlan) => {
  setPricing((prevPlans) =>
    prevPlans.map((plan) =>
      plan.name === updatedPlan.name ? updatedPlan : plan
    )
  );
  setIsEdit(false);
};
const handleCreatePlan=()=>{
  navigate('/CreatePlan')
}
const handleCancelEdit = () => {
  setIsEdit(false);
};
  if(!isAuthenticated ){
    return <Login/>; 
}
if(isEdit){
  return <EditPlan 
  planToEdit={currplan}
  onPlanUpdated={updatePlanInList}
  onCancel={handleCancelEdit}
  />
}
  return (
    <>
      {/* Cart Modal */}
      {isCartVisible && (
        <div className="cart-modal">
          <div className="cart-box">
            <button
              className="close-btn"
              onClick={() => setIsCartVisible(false)}
            >
              ✖
            </button>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <p>{item.name}</p>
                    <p>Price per user: ₹{item.price}</p>
                    <p>Users: {item.userCount}</p>
                    <p>
                      Subtotal: ₹{item.price * item.userCount}
                    </p>
                  </div>
                ))}
                <h3>Total Price: ₹{calculateTotalPrice()}</h3>
              </div>
            )}
            {cart.length > 0 && (
              <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
            )}
          </div>
        </div>
      )}

      {/* Plans Section */}
      <div className="plans-container">
        <div
          className="cart-icon"
          onClick={() => setIsCartVisible(true)}
        >
          🛒
          <span className="cart-count">{cart.length}</span>
        </div>
        <h2 className="title">Choose Your Plan</h2>
        <button className="create-plan" onClick={handleCreatePlan}>create plan</button>
        <div className="plans-list">
          
          {plans.map((plan) => (
            <div key={plan.name} className="plan-card">
              <h3>{plan.name}</h3>
              <p className="price">
                {plan.price === 0 ? "Free" : `₹${plan.price}/year/user`}
              </p>
              <p>{plan.description}</p>
              <div className="user-count-controls">
                <button
                  className="decrement-btn"
                  onClick={() => handleDecrement(plan)}
                >
                  -
                </button>
                <span className="user-count">
                  {userCounts[plan.name]}
                </span>
                <button
                  className="increment-btn"
                  onClick={() => handleIncrement(plan)}
                >
                  +
                </button>
              </div>
              <button
                className="btn"
                onClick={() => addToCart(plan)}
              >
                Add To Cart
              </button>
              <button
                className="btn"
                onClick={() => handleEdit(plan)}
              >
               Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Plans;
