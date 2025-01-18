import { createContext, useState } from 'react'
import {  Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Plans from './components/Plans/Plans';
import Login from './components/login/Login.jsx';
import Signup from './components/signup/Signup.jsx';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './components/Authentication/Authenticaton.jsx';
import Dashboard from './components/Dashoboard/Dashboard.jsx';
import Home from './components/Home/Home.jsx';
import Error from './components/Error/Error.jsx';
import CreatePlan from './components/createPlan/CreatePlan.jsx';
import Success from './components/status/Success.jsx';
import Cancel from './components/status/Cancel.jsx';

function App() {
 
 const Authentication= createContext();

  return (
    <>
     <AuthProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<Error/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pricing" element={<Plans/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/createplan" element={<CreatePlan/>} />
        <Route path="/success" element={<Success/>} />
        <Route path="/cancel" element={<Cancel/>} />
     
      </Routes>
      <ToastContainer />
      </AuthProvider>
    </>
  )
}

export default App
