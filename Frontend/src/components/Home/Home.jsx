import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Home.css';
import { useAuth } from '../Authentication/Authenticaton';

const HomePage = () => {
  const {  isAuthenticated, login, logout } = useAuth();
    const navigate= useNavigate();
    const handleGetStarted=()=>{
        navigate('/login');
    }
    if(isAuthenticated){
      return navigate('/dashboard');
    }
  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <ul className="navbar-links">
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/vlog">Vlog</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li><NavLink to="/signup">Register</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Website</h1>
          <p>Explore our content, learn, and stay connected</p>
          <button className="cta-button" onClick={handleGetStarted}>Get Started</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
