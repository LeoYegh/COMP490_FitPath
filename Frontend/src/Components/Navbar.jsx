import logo from "../assets/FitPalLogo.jpeg";
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import '../styles/NavBar.css';


function Navbar() {

  return (
    <div className="navbar">
      <div className="leftSide">
        <img src={logo} />
      </div>
      <div className='rightSide'>
        <Link to='/'>Home</Link>
        <Link to='/signUp'>Sign Up</Link>
        <Link to='/login'>Login</Link>
        <Link to='/About'>About us</Link>
        <Link to='/Contact'>Contact</Link>
      </div>
    </div>
  );
}
//C:\Users\alice\OneDrive\Documents\extra fitpath files\COMP490_FitPath-main\Frontend
export default Navbar
