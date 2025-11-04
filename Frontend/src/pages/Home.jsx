import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
    return (
        <div className="home">
            <div className='headerContainer'>
                <h1>Sign up now</h1>
                <Link to="/signUP">Start today</Link>
            </div>

        </div>
    )
}

export default Home
