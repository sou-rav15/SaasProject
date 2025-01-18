
import React, { useState, useEffect } from 'react';
// import { Container, Form, Button, Alert } from 'react-bootstrap';
import './Signup.css'; 
// import { useAuth } from '../Authentication/Authenticaton.jsx';
import { NavLink, useNavigate } from 'react-router-dom';
import { HandleError, HandleSuccess } from '../../../utils';
import Dashboard from '../Dashoboard/Dashboard';
import { useAuth } from '../Authentication/Authenticaton';
// import { ToastContainer } from 'react-toastify';
// import { HandleError, HandleSuccess } from '../../utils';


const Signup = () => {
    // const { isAuthenticated } = useAuth(); 
    const [signupInfo, setsignupInfo] = useState({
        name: '',
        userName: '',
        email: '',
        password: '',
       
    });
    const {  isAuthenticated, login, logout } = useAuth();
    const [checkBox, setCheckBox] = useState(false);
    // const apiUrl = import.meta.env.VITE_API_URL
    const apiUrl='http://localhost:8100';
    const handleCheckBox = () => {
        setCheckBox(prevCheckBox => !prevCheckBox);
    };

    useEffect(() => {
        console.log(checkBox);
    }, [checkBox]);

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copysignupInfo = { ...signupInfo };
        copysignupInfo[name] = value;
        setsignupInfo(copysignupInfo);
    };

    const handleSubmit= async (e) => {
        console.log(signupInfo);
        
        e.preventDefault();
        const { name, email, password, userName } = signupInfo;
        if (!checkBox) {
            return HandleError('You must accept the terms and conditions');
        }
        if (!name || !email || !password || !userName ) {
            return HandleError('All fields are required');
        }

        try {
            const url = `${apiUrl}/register`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                HandleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                HandleError(details);
            } else {
                HandleError(message);
            }
        } catch (error) {
            HandleError(error);
        }
    }
    // if (isAuthenticated) {
    //     navigate('/Problems');
    //     return null; 
    // }
    if( isAuthenticated){
         return navigate('/dashboard');
    }
    
    return (
        <>

    <div className="parent-box">
      <div className="form-shadow">
        <div className="signup-container">
          <h2 className="form-title">Sign Up</h2>
          <form onSubmit={handleSubmit} className="form-container">
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={signupInfo.name}
                onChange={handleChange}
                required
              />
            </div>

          
        
            {/* Username */}
            <div className="form-group">
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                id="userName"
                name="userName"
                placeholder="Enter your username"
                value={signupInfo.userName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={signupInfo.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={signupInfo.password}
                onChange={handleChange}
                required
              />
            </div>


            {/* Terms & Conditions */}
            <div className="form-group">
              <input
                type="checkbox"
                id="terms"
                checked={checkBox}
                onChange={handleCheckBox}
              />
              <label htmlFor="terms">
                I agree to the{" "}
                <NavLink className="terms-link" to="/terms-and-conditions">
                  terms and conditions
                </NavLink>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn" >
              Sign Up
            </button>

            {/* Login Link */}
            <div className="login-link">
              <p>
                Already have an account? <NavLink to="/login">Log In</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>

        </>
    );
};

export default Signup;

