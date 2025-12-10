import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';

/**
 * 
 * @returns {String}
 * @author Feather Hoshizora
 * About page
 * Lists names of collaborators on project
 */
function About() {
    return (
        <div className="about">
            <div className='headerContainer'>
                <h2>Creators:</h2>
                <h1>Leo Yeghiayan</h1>
                <h1>Feather Hoshizora</h1>
                <h1>Vahe Tovmasian</h1>
                <h1>Toumas Solyman</h1>
                <Link to="/signUP">Start today</Link>
            </div>

        </div>
    )
}

export default About
