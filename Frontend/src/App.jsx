import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from "./pages/Login";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

/**
 * Component Name: App
 * Date: May 15, 2025
 * Programmer: Toumas Solyman
 *
 * Description:
 * This is the main component of the Fitness Tracker front-end application.
 * It uses React Router to manage navigation between different pages, including Home,
 * Login, SignUp, About, and Contact. It also renders the Navbar component across all routes.
 *
 * Important Data Structures:
 * No internal state is used in this component. React Router's <Routes> and <Route>
 * elements are used to structure the application's page navigation.
 *
 * Algorithms:
 * No custom algorithms are used. The routing logic is declarative and handled
 * entirely by React Router's built-in system. Each route maps a URL path to a component.
 */




function App() {


    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const savedEmail = localStorage.getItem("currentUserEmail");
        if (savedEmail) {
            setIsLoggedIn(true);
        }
    }, []);


    useEffect(() => {
        const handleStorage = () => {
            const savedEmail = localStorage.getItem("currentUserEmail");
            setIsLoggedIn(!!savedEmail);
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);


    return <div className="App">
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/signUp" exact element={<SignUp />} />
                <Route path="/About" exact element={<About />} />
                <Route path="/ContactUs" exact element={<ContactUs />} />
                <Route path="/profile" exact element={<Dashboard />} />
            </Routes>
        </Router>

    </div>;

}

export default App
