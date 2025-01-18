import React from "react";
import "./Content.css";
import { useAuth } from "../Authentication/Authenticaton";
import { useNavigate } from "react-router-dom";
import Login from "../login/Login";

function Content() {
    const navigate= useNavigate()
    const {  isAuthenticated, login, logout } = useAuth();
if(!isAuthenticated){
    return <Login/>; 
}
  return (
    <div className="content-container">
      <h2>Welcome to MyPlatform</h2>
      <p>
        MyPlatform offers a wide range of resources to help you succeed. 
        Our pricing is competitive, and our dashboard provides you with 
        all the tools you need to manage your account effectively.
      </p>
      <h3>What We Offer:</h3>
      <ul>
        <li>Comprehensive resources for learning and development.</li>
        <li>Transparent and affordable pricing plans.</li>
        <li>An intuitive dashboard to track your progress and activities.</li>
      </ul>
    </div>
  );
}

export default Content;
