import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

/**
 * Component Name: Home
 * Date: May 15, 2025
 * Programmer: Toumas Solyman
 *
 * Description:
 * This component serves as the landing page of the Fitness Tracker application.
 * It introduces users to the app’s purpose—tracking meals, exercises, and progress.
 * The page includes a "Start Today" link that navigates users to the SignUp page.
 *
 * Important Data Structures:
 * This component does not use internal state or props. It consists entirely
 * of static content styled through CSS.
 *
 * Algorithms:
 * No algorithms are used in this component. Navigation is handled declaratively
 * through React Router's <Link> component for client-side routing.
 */

function Home() {
    return (
        <div className="home">
            <div className='headerContainer'>

                <div>


                    <h1>Start Your Fitnees Journey Today</h1>
                    <p>Track your calories, workouts, and progress effortlessly.<br />
                        Get personalized fitness advice and meal insights<br /> that help
                        you stay on track every day.
                    </p>
                    <Link className='button' to="/signUP">Start today</Link>
                </div>

            </div>

        </div>
    )
}

export default Home
