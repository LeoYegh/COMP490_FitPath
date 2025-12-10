import logo from "../assets/FitPalLogo.jpeg";
import React from 'react'
import { Link } from 'react-router-dom';

import '../styles/NavBar.css';

function Navbar({ isLoggedIn }) {

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
        <Link to='/ContactUs'>Contact Us</Link>


        {isLoggedIn
          ? <Link to='/Dashboard'>Dashboard</Link>
          : null
        }
      </div>
    </div>
  );
}

export default Navbar;