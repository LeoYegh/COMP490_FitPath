import { useState } from "react";
import "../styles/SignUp.css";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";
const ENDPOINT = "/api/v1/registration"; // Change to our backend route

export default function SignUp() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        appUserRole: "USER",
    });
    const [isLoading, setIsLoading] = useState(false)
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
            const res = await fetch(`${API_BASE}${ENDPOINT}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const ct = res.headers.get("content-type") || "";
            const payload = ct.includes("application/json") ? await res.json() : await res.text();

            if (!res.ok) {
                const msg = typeof payload === "string" ? payload : payload?.message || JSON.stringify(payload);
                throw new Error(msg || `Request failed with status ${res.status}`);
            }

            const successMsg = typeof payload === "string" && payload.trim().length > 0
                ? `Registered! Token: ${payload}`
                : "Registered! Check your email to confirm.";

            setMessage(successMsg);
            setForm({ firstName: "", lastName: "", email: "", password: "", appUserRole: "USER" });
        } catch (err) {
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
                            <input type="text" value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} required />
                        </div>
                        <div>
                            <label>Last Name</label>
                            <input type="text" value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} required />
                        </div>
                    </div>

                    <label>Email</label>
                    <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} required />

                    <label>Password</label>
                    <input type="password" value={form.password} onChange={(e) => updateField("password", e.target.value)} required />

                    <label>Role</label>
                    <select value={form.appUserRole} onChange={(e) => updateField("appUserRole", e.target.value)}>
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>

                    <button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : "Register"}</button>
                </form>

                {message && <div className="message success">{message}</div>}
                {error && <div className="message error">{error}</div>}
            </div>
        </div>
    )
}