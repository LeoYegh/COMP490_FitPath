import { useState } from "react";
import "../styles/SignUp.css";
import gymImage from "../assets/gym.jpeg";

/**
 * Component Name: SignUp
 * Date: May 15, 2025
 * Programmer: Toumas Solyman
 *
 * Description:
 * This component allows new users to create an account by submitting personal information
 * to the backend registration endpoint. It includes client-side validation, controlled input
 * handling, and asynchronous API communication with fetch().
 *
 * Important Data Structures:
 * - form (object): Stores user inputs for firstName, lastName, email, password, and role.
 * - isLoading (boolean): Indicates whether the registration request is in progress.
 * - message (string|null): Displays success messages after successful registration.
 * - error (string|null): Displays error messages for failed submissions or validation errors.
 *
 * Algorithms:
 * - Basic form validation: Ensures required fields are filled and email format is valid using regex.
 * - Controlled component pattern: Keeps the form fields in sync with React state for predictable UI behavior.
 * - Async/Await network call: Handles asynchronous POST request with error handling and user feedback.
 */

// Base URL comes from env; fall back to localhost for safety
const RAW_API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
// strip trailing slashes so we don't get // in the URL
const API_BASE = RAW_API_BASE.replace(/\/+$/, "");
const ENDPOINT = "/api/v1/registration";

console.log("API_BASE AT RUNTIME =", API_BASE);

export default function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  function updateField(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    const emailOk = /.+@.+\..+/.test(form.email);
    if (!emailOk) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setIsLoading(true);

      const payloadToSend = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      };


      const res = await fetch(`${API_BASE}${ENDPOINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadToSend),
      });

      const ct = res.headers.get("content-type") || "";
      const payload = ct.includes("application/json")
        ? await res.json()
        : await res.text();

      if (!res.ok) {
        const msg =
          typeof payload === "string"
            ? payload
            : payload?.message || JSON.stringify(payload);
        throw new Error(msg || `Request failed with status ${res.status}`);
      }

      const successMsg =
        typeof payload === "string" && payload.trim().length > 0
          ? `Registered! Token: ${payload}`
          : "Registered! Check your email to confirm.";

      setMessage(successMsg);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="form-card">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="name-group">
            <div>
              <label>First Name</label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                required
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                required
              />
            </div>
          </div>

          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            required
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Register"}
          </button>
        </form>

        {message && <div className="message success">{message}</div>}
        {error && <div className="message error">{error}</div>}
      </div>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${gymImage})` }}
      ></div>
    </div>
  );
}
