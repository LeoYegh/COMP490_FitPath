import logo from "../assets/FitPalLogo.jpeg";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
import { useUser } from '../Context/UserContext';
import '../styles/NavBar.css';

function Navbar() {
  const { isSetupComplete, logout } = useUser();
  const navigate = useNavigate(); // Used to redirect after logout

  const handleLogout = () => {
    logout(); // Clear the context
    navigate('/'); // Send the user back to the Home or Login page
  };

  return (
    <div className="navbar">
      <div className="leftSide">
        <img src={logo} alt="FitPal Logo" />
      </div>
      <div className='rightSide'>
        <Link to='/'>Home</Link>

        {isSetupComplete ? (
          <>
            <Link to='/Dashboard'>Dashboard</Link>
            {/* We use a button or a Link that triggers the handleLogout */}
            <button className="logout-btn" onClick={handleLogout} style={{background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', font: 'inherit'}}>
                Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/signUp'>Sign Up</Link>
            <Link to='/login'>Login</Link>
          </>
        )}

        <Link to='/About'>About us</Link>
        <Link to='/ContactUs'>Contact Us</Link>
      </div>
    </div>
  );
}

export default Navbar;