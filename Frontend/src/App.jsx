import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Login from "./pages/Login";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard";
// --- NEW IMPORTS FOR USER PROFILE MANAGEMENT ---
import UserProfileSetup from './pages/UserProfileSetup';
import { UserProvider, useUser } from './Context/UserContext';
// Add { useEffect } to this line!
import React, { useEffect } from 'react'; 

/**
 * Component Name: DashboardGatekeeper
 * Description: 
 * This component checks the user's setup status from the context. 
 * If the profile is not complete, it renders the setup form.
 * If the profile is complete, it renders the main Dashboard.
 * This is used specifically for the '/Dashboard' route.
 */
const DashboardGatekeeper = () => {
    const { 
        isSetupComplete, 
        isLoading, 
        checkExistingSetup, 
        userMetrics, 
        saveUserProfile 
    } = useUser();

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        // 2. If we have an email but don't know if setup is done, ask the DB
        if (email && !isSetupComplete) {
            checkExistingSetup(email);
        }
    }, [isSetupComplete, checkExistingSetup]);

    // 3. While the database is being checked, show a loading message
    // This prevents the setup form from showing up prematurely
    if (isLoading && !isSetupComplete) {
        return (
            <div style={{ 
                display: 'flex', 
                height: '100vh', 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: '#1a1a1a', 
                color: 'white' 
            }}>
                <h2>Loading your profile...</h2>
            </div>
        );
    }

    // 4. If the check finished and we still have no data, show the form
    if (!isSetupComplete) {
        return (
            <UserProfileSetup 
                onSave={saveUserProfile} 
                initialData={userMetrics}
            />
        );
    }

    // 5. If data was found or just saved, show the Dashboard
    return <Dashboard />;
};


/**
 * Component Name: App
 * Date: May 15, 2025 (Updated Dec 2025 for Profile Setup)
 * Programmer: Toumas Solyman & Gemini
 *
 * Description:
 * This is the main component of the Fitness Tracker front-end application.
 * It now wraps the router in the UserProvider for global state management 
 * and uses a DashboardGatekeeper component to conditionally show the profile setup 
 * form or the main dashboard upon navigating to /Dashboard.
 */
function App() {
    return (
        // 3. Wrap the application in UserProvider
        <UserProvider>
            <div className="App">
                <Router>
                    <Navbar />
                    <Routes>
                        {/* Static Pages */}
                        <Route path="/" exact element={<Home />} />
                        <Route path="/login" exact element={<Login />} />
                        <Route path="/signUp" exact element={<SignUp />} />
                        <Route path="/About" exact element={<About />} />
                        <Route path="/ContactUs" exact element={<ContactUs />} />

                        {/* Protected/Conditional Page */}
                        {/* 4. Use the DashboardGatekeeper component for the Dashboard route */}
                        <Route path="/Dashboard" exact element={<DashboardGatekeeper />} />
                    </Routes>
                </Router>
            </div>
        </UserProvider>
    );
}

export default App;