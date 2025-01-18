
import React, { useEffect, useState } from 'react';
import './login.css';
import { HandleSuccess, HandleError } from '../../../utils.js';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication/Authenticaton.jsx';
function Login() {
  const [LoginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const { login, isAuthenticated } = useAuth(); 
  const navigate = useNavigate();
 
  const apiUrl='http://localhost:8100';
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = LoginInfo;

    if (!email || !password) {
      // return null;
      return HandleError('All fields are required');
    }

    try {

    const url = `${apiUrl}/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(LoginInfo),
      });

      const result = await response.json();
      const { success, message, jwtoken, name, userName, userId, error } = result;

      if (success) {
        HandleSuccess(message);
        console.log('login succesfull');
        
        localStorage.setItem('token', jwtoken);
        localStorage.setItem('loggedInUser', name);
        localStorage.setItem('username', userName);
        localStorage.setItem('userId', userId);
        // localStorage.setItem('gender', gender);
        
        // Call login from AuthContext to update auth state
        login();
        setTimeout(() => {
        
          navigate('/dashboard');
         
        }, 1000);
      } else {
        HandleError(error||message || 'Invalid login details'); 
      }
    } catch (error) {
    HandleError( error.message); 
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/Dashboard'); // Only navigate when authentication is successful
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='login-container'>
      <div className='login-card'>
        <h1 className='sign-in'>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              placeholder='Enter Your Email'
              className='form-control'
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter Your Password'
              className='form-control'
              onChange={handleChange}
            />
          </div>
          <div className='signup-link'>
            <span>Already have an account? </span>
            <NavLink to='/Signup'>Sign up</NavLink>
          </div>
          <button type='submit' className='login-button'>Sign in</button>
             <div className='mb-3' >
  <span>
   
    <NavLink style={{ textDecoration: 'none', listStyle: 'none' }} to={'/ForgotPassword'}> Forgot Password?</NavLink>
   </span>
 </div>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Login;
