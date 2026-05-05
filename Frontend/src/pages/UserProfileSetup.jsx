import React, { useState } from 'react';
import '../styles/UserProfileSetup.css'; 
import { Icons } from './Dashboard'; 
import { useUser } from '../Context/UserContext';

// 1. API Configuration
const RAW_API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const API_BASE = RAW_API_BASE.replace(/\/+$/, "");
const ENDPOINT = "/api/calorie/me"; // Update this to your actual endpoint

const DEFAULT_GOALS = {
    age: 30,
    height: 175,
    weight: 70,
    calorieGoal: 2000,
    proteinGoal: 140,
    carbsGoal: 300,
    fatGoal: 80,
    sleepGoal: 8,
};


const UserProfileSetup = ({ onSave, initialData }) => {
    const [formData, setFormData] = useState(initialData || DEFAULT_GOALS);
    // 2. Added status states
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name !== 'sleepGoal' ? parseInt(value) || 0 : parseFloat(value) || 0,
        }));
    };

    // 3. Updated handleSubmit to be asynchronous
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
              // 1. Retrieve the email we saved during Sign Up
            const userEmail = localStorage.getItem("userEmail");

            if (!userEmail) {
                throw new Error("User email not found. Please sign up again.");
            }
            // 2. Create params including the email
            const params = new URLSearchParams({
                email: userEmail, // This must match the @RequestParam in your Java Controller
                calories: formData.calorieGoal,
                protein: formData.proteinGoal,
                fat: formData.fatGoal,
                carbs: formData.carbsGoal,
                mealType: 'Daily Goal'
            });

            // 3. Make the request
            const res = await fetch(`${API_BASE}${ENDPOINT}?${params.toString()}`, {
                method: "POST"
                // No headers or body needed for @RequestParam
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || `Server responded with ${res.status}`);
            }

            if (onSave) {
                onSave(formData);
            }
            
            console.log("Profile goals saved to email:", userEmail);
        } catch (err) {
            console.error("Save error:", err);
            setError(err.message || "Failed to save profile.");
        } finally {
            setIsLoading(false);
        }
    };

    const InputField = ({ label, name, unit, min = 1, type = "number", step = "1" }) => (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <div className="input-field-wrapper">
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    min={min}
                    step={step}
                    required
                    className="setup-input"
                    disabled={isLoading} // Disable input while saving
                />
                <span className="input-unit">{unit}</span>
            </div>
        </div>
    );

    return (
        <div className="setup-container">
            <form onSubmit={handleSubmit} className="setup-form">
                <div className="setup-header">
                    <span className="logo-text">FITPATH</span>
                    <Icons.heartmonitorlookingsymbol />
                </div>
                <h2>Personal Goals Setup</h2>
                <p>Tell us a bit about yourself and your fitness goals to get started.</p>

                {error && <div className="message error" style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}

                <div className="form-section">
                    <h3>Personal Information</h3>
                    <InputField label="Age" name="age" unit="years" min={1} />
                    <InputField label="Height" name="height" unit="cm" min={100} />
                    <InputField label="Weight" name="weight" unit="kg" min={30} />
                    <InputField label="Sleep Goal" name="sleepGoal" unit="hours" type="number" min={1} max={12} step="0.5" />
                </div>

                <div className="form-section">
                    <h3>Daily Macro Goals (grams)</h3>
                    <InputField label="Calorie Goal" name="calorieGoal" unit="kcal" min={1000} step="100" />
                    <InputField label="Protein Goal" name="proteinGoal" unit="g" min={10} />
                    <InputField label="Carbs Goal" name="carbsGoal" unit="g" min={10} />
                    <InputField label="Fat Goal" name="fatGoal" unit="g" min={10} />
                </div>

                <button type="submit" className="setup-submit-btn" disabled={isLoading}>
                    {isLoading ? "SAVING..." : "SAVE PROFILE & START TRACKING"}
                </button>
            </form>
        </div>
    );
};

export { Icons, DEFAULT_GOALS }; 
export default UserProfileSetup;