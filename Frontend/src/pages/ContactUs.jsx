import React, { useState } from 'react';
import '../styles/ContactUs.css';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setStatusMessage("Thanks for reaching out! We'll get back to you soon.");
    setFormData({
      user_name: '',
      user_email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <section className="contact-us-page">
      <div className="contact-us-shell">
        <div className="contact-us-info">
          <p className="contact-us-kicker">Contact FitPath</p>
          <h1>We’d love to hear from you.</h1>
          <p>
            Have a question, idea, or issue? Send us a message and our team will
            get back to you as soon as possible.
          </p>

          <p className="contact-us-meta">Support Hours: Mon - Fri, 9:00 AM - 6:00 PM</p>
          <p className="contact-us-meta">Typical Reply Time: Within 24 hours</p>
          <p className="contact-us-meta">Email: support@fitpath.app</p>
        </div>

        <form className="contact-us-form" onSubmit={handleSubmit}>
          <h2>Send us a message</h2>

          <label htmlFor="user_name">Name</label>
          <input
            id="user_name"
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            placeholder="Your full name"
            required
          />

          <label htmlFor="user_email">Email</label>
          <input
            id="user_email"
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="How can we help?"
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            rows="5"
            required
          />

          <button type="submit">Send Message</button>

          {statusMessage && (
            <p className="contact-us-status" role="status">
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
