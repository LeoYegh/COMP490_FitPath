import CsunGymImage from "../assets/CsunGym.jpg";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const API_BASE = "http://localhost:8080/api/v1/auth";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      // Attempt login
      await axios.post(`${API_BASE}/login`, { email, password });

      // Save email to localStorage if needed later
      localStorage.setItem("currentUserEmail", email);

      // Update App state so Navbar shows Dashboard
      setIsLoggedIn(true);

      // Redirect to dashboard
      navigate("/Dashboard");

    } catch (err) {
      setMessage("Invalid email or password.");
    }

    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="form-card">
        <h1>Login To Your Account</h1>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {message && <div className="message error">{message}</div>}
      </div>

      <div
        className="background-image"
        style={{ backgroundImage: `url(${CsunGymImage})` }}
      ></div>
    </div>
  );
}