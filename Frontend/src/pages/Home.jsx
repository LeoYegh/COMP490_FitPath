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
    const features = [
        {
            title: 'Personalized Workout Guidance',
            description:
                'Receive AI-assisted routines based on your current level, goals, and schedule.',
        },
        {
            title: 'Smart Nutrition Tracking',
            description:
                'Log meals in seconds and get macro-level insights to keep your progress consistent.',
        },
        {
            title: 'Progress You Can Feel',
            description:
                'Visualize trends in calories, steps, and strength milestones with clear, useful dashboards.',
        },
    ];

    return (
        <main className="home">
            <section className="hero">
                <p className="hero-eyebrow">Fitness made simple</p>
                <h1>Stay active and track your progress.</h1>
                <p className="hero-description">
                    FitPath helps you log workouts, monitor nutrition, and keep your routine
                    going with easy daily tracking tools.
                </p>
                <div className="hero-actions">
                    <Link className="btn btn-primary" to="/signUp">
                        Get Started
                    </Link>
                    <Link className="btn btn-secondary" to="/login">
                        Login
                    </Link>
                </div>
            </section>

            <section className="home-section">
                <h2>Core tools for your fitness routine</h2>
                <p className="section-subtitle">
                    Straightforward features that help you stay consistent every week.
                </p>
                <div className="feature-grid">
                    {features.map((feature) => (
                        <article key={feature.title} className="feature-card">
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="cta-banner">
                <h2>Ready to get started?</h2>
                <p>Create an account and begin tracking today.</p>
                <Link className="btn btn-primary" to="/signUp">
                    Create Your Account
                </Link>
            </section>
        </main>
    );
}

export default Home
