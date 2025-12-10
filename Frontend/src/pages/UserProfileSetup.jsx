import React, { useState } from 'react';
import '../styles/UserProfileSetup.css'; // Don't forget to create this CSS file!
import { Icons } from './Dashboard'; // Reusing the Plus icon from Dashboard

// --- DATA CONSTANTS (The "Database") ---
// Using default values for the form's initial state
const DEFAULT_GOALS = {
    age: 30,
    height: 175, // cm
    weight: 70, // kg
    calorieGoal: 2500,
    proteinGoal: 200,
    carbsGoal: 300,
    fatGoal: 80,
    sleepGoal: 8,
};

const UserProfileSetup = ({ onSave, initialData }) => {
    // Initialize state with initialData (if provided from context) or defaults
    const [formData, setFormData] = useState(initialData || DEFAULT_GOALS);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Convert to a number for calculation fields, keep as string otherwise
        setFormData(prev => ({
            ...prev,
            [name]: name !== 'sleepGoal' ? parseInt(value) || 0 : parseFloat(value) || 0,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    // Helper component for a standardized form input field
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

                {/* --- Personal Metrics Section --- */}
                <div className="form-section">
                    <h3>Personal Information</h3>
                    <InputField label="Age" name="age" unit="years" min={1} />
                    <InputField label="Height" name="height" unit="cm" min={100} />
                    <InputField label="Weight" name="weight" unit="kg" min={30} />
                    <InputField label="Sleep Goal" name="sleepGoal" unit="hours" type="number" min={1} max={12} step="0.5" />
                </div>

                {/* --- Calorie & Macro Goals Section --- */}
                <div className="form-section">
                    <h3>Daily Macro Goals (grams)</h3>
                    <InputField label="Calorie Goal" name="calorieGoal" unit="kcal" min={1000} step="100" />
                    <InputField label="Protein Goal" name="proteinGoal" unit="g" min={10} />
                    <InputField label="Carbs Goal" name="carbsGoal" unit="g" min={10} />
                    <InputField label="Fat Goal" name="fatGoal" unit="g" min={10} />
                </div>

                <button type="submit" className="setup-submit-btn">
                    SAVE PROFILE & START TRACKING
                </button>
            </form>
        </div>
    );
};

// Export Icons here so the setup file can reuse them without re-defining.
export { Icons, DEFAULT_GOALS }; 
export default UserProfileSetup;