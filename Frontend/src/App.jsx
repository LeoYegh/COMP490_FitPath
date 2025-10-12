import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from "./pages/Login";

import SignUp from "./pages/SignUp"


function App() {

    return <div className="App">
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/signUp" exact element={<SignUp />} />
            </Routes>
        </Router>

    </div>;

}

export default App

