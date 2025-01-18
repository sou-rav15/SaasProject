import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../Authentication/Authenticaton'
import Login from "../login/Login";
function Navbar() {
    const [isAdmin , setisAdmin]= useState(false);
       const {  isAuthenticated, login, logout } = useAuth();
       const navigate= useNavigate();
       const handleLogout=()=>{
        logout();
        navigate('/');
       }
       useEffect(()=>{
        const admin=localStorage.getItem("admin");
       },[])
    if(!isAuthenticated){
        return <Login/>; 
    }
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Exampler.com</h1>
        <ul className="nav-links">
          <li><NavLink to="/resources">Resources</NavLink></li>
          <li><NavLink to="/pricing">Pricing</NavLink></li>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          {isAdmin&&<li><NavLink to="/admin">Admin</NavLink></li>}
          
          <button onClick={handleLogout}>logout</button>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
