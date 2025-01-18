import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Dashboard.css'
import Navbar from '../Navbar/Navbar'
import Content from '../Content/Content'
import { useNavigate } from "react-router-dom";
import Login from '../login/Login'
import { useAuth } from '../Authentication/Authenticaton'
function Dashboard() {
     const navigate= useNavigate()
     const {  isAuthenticated, login, logout } = useAuth();
     if(!isAuthenticated){
        return <Login/>; 
    }
  return (
    <>
     <Navbar/>
     <Content/>
    </>
  )
}

export default Dashboard
