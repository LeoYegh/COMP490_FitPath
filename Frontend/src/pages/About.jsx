import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';

/**
 * Component Name: About
 * Description:
 * The About page introduces the FitPath mission, team, and values.
 */
function About() {
    const teamMembers = ['Leo Yeghiayan', 'Feather Hoshizora', 'Vahe Tovmasian', 'Toumas Solyman'];

    const values = [
        {
            title: 'Consistency Over Perfection',
            description:
                'We focus on daily wins and sustainable progress, because small habits create lasting change.',
        },
        {
            title: 'Simple, Clear Tracking',
            description:
                'Fitness tools should feel straightforward. We design every flow to be fast and easy to use.',
        },
        {
            title: 'Built for Real Life',
            description:
                'FitPath supports busy schedules with practical insights that help users stay on track.',
        },
    ];

    return (
        <main className="about-page">
            <section className="about-hero">
                <p className="about-eyebrow">Who we are</p>
                <h1>Helping people build healthier routines, one day at a time.</h1>
                <p className="about-description">
                    FitPath was created by a team of students who wanted fitness tracking to feel
                    motivating instead of overwhelming. Our goal is to combine workouts, nutrition,
                    and progress insights into one clean experience.
                </p>
                <div className="about-actions">
                    <Link className="about-btn about-btn-primary" to="/signUp">
                        Start Today
                    </Link>
                    <Link className="about-btn about-btn-secondary" to="/ContactUs">
                        Contact Us
                    </Link>
                </div>
            </section>

            <section className="about-section">
                <h2>What we believe</h2>
                <p className="about-subtitle">
                    Every feature in FitPath is guided by these core principles.
                </p>
                <div className="about-grid">
                    {values.map((value) => (
                        <article className="about-card" key={value.title}>
                            <h3>{value.title}</h3>
                            <p>{value.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="about-section team-section">
                <h2>Meet the team</h2>
                <p className="about-subtitle">
                    The people behind the product, design, and development of FitPath.
                </p>
                <div className="team-grid">
                    {teamMembers.map((member) => (
                        <article className="team-card" key={member}>
                            <span className="team-avatar">{member.charAt(0)}</span>
                            <h3>{member}</h3>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default About;
