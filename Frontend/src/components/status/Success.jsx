import React from 'react'
import './Success.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication/Authenticaton';
function Success() {
    const navigate= useNavigate();
     const {  isAuthenticated, login, logout } = useAuth();
    const handleHome =()=>{
        navigate('/dashboard')
    }
    if(!isAuthenticated){
        return navigate('/');
    }
  return (

    <>
      <div className='success-container'>
      <div className='message'>
        <div>
        <h2>successful paymnet</h2>
        
        </div>
        <button onClick={handleHome}>Home</button>
      </div>
      </div>
    </>
  )
}

export default Success
