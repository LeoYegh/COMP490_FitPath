import CsunGymImage from "../assets/CsunGym.jpg";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const API_BASE = "http://localhost:8080/api/v1/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setIsLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/login`, { email, password });

      localStorage.setItem("currentUserEmail", email);

      window.dispatchEvent(new Event("storage"));


      navigate("/Dashboard");

    } catch (err) {
      let text = "Login failed. Please try again.";

      if (err.response?.status === 401) {
        text = "Invalid email or password.";
      }

      setMessage({ type: "error", text });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h1>Login To Your Account</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
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

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
      </div>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${CsunGymImage})` }}
      ></div>
    </div>
  );
}