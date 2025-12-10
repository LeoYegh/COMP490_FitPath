import React, { createContext, useState, useContext } from 'react';
import { DEFAULT_GOALS } from '../pages/UserProfileSetup'; // Import defaults from the form file

// Create the Context object
const UserContext = createContext();

// Custom hook to use the User Context easily
export const useUser = () => {
    return useContext(UserContext);
};

// Provider component to wrap your application
export const UserProvider = ({ children }) => {
    // Use a flag to track if setup is complete
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    // State to hold the user's metric and goal data
    const [userMetrics, setUserMetrics] = useState(DEFAULT_GOALS);
    
    // Function to update user goals and mark setup as complete
    const saveUserProfile = (data) => {
        setUserMetrics(data);
        setIsSetupComplete(true);
        // Optional: Persist to local storage here if you want it to survive a refresh
        localStorage.setItem('userMetrics', JSON.stringify(data));
        localStorage.setItem('isSetupComplete', 'true');
    };

    // Load from local storage on initial load (optional persistence)
    // useEffect(() => {
    //     const savedMetrics = localStorage.getItem('userMetrics');
    //     const savedSetupStatus = localStorage.getItem('isSetupComplete');
    //     if (savedMetrics) {
    //         setUserMetrics(JSON.parse(savedMetrics));
    //     }
    //     if (savedSetupStatus === 'true') {
    //         setIsSetupComplete(true);
    //     }
    // }, []);

    const value = {
        userMetrics,
        isSetupComplete,
        saveUserProfile,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};