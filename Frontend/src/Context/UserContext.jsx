import React, { createContext, useState, useContext } from 'react';
import { DEFAULT_GOALS } from '../pages/UserProfileSetup';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    // CRITICAL: Initialize isLoading as true so the app waits for the DB check
    const [isLoading, setIsLoading] = useState(true);
    const [userMetrics, setUserMetrics] = useState(DEFAULT_GOALS);
    const [user, setUser] = useState(null);

    const saveUserProfile = (data) => {
        setUserMetrics(data);
        setIsSetupComplete(true);
        localStorage.setItem('userMetrics', JSON.stringify(data));
        localStorage.setItem('isSetupComplete', 'true');
    };

    const logout = () => {
        setIsSetupComplete(false);
        setUserMetrics(DEFAULT_GOALS);
        setUser(null);
        localStorage.removeItem('userMetrics');
        localStorage.removeItem('isSetupComplete');
        localStorage.removeItem('userEmail'); 
    };

    const checkExistingSetup = async (email) => {
        setIsLoading(true); // Start loading
        try {
            const res = await fetch(`http://localhost:5000/api/calorie/me?email=${email}`);
            if (res.ok) {
                const data = await res.json();
                const dailyGoal = Array.isArray(data) 
                    ? data.find(log => log.mealType === 'Daily Goal')
                    : data;

                if (dailyGoal) {
                    setUserMetrics({
                        ...DEFAULT_GOALS, 
                        calorieGoal: dailyGoal.calories,
                        proteinGoal: dailyGoal.protein,
                        fatGoal: dailyGoal.fat,
                        carbsGoal: dailyGoal.carbs,
                    });
                    setIsSetupComplete(true);
                }
            }
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            // This ensures the Loading screen disappears regardless of success/fail
            setIsLoading(false); 
        }
    };

    const value = {
        user,
        setUser,
        userMetrics,
        isSetupComplete,
        isLoading,           // MUST BE HERE
        checkExistingSetup,  // MUST BE HERE
        saveUserProfile,
        logout,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};