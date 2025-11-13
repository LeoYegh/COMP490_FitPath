import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp"


function App() {

    return <div className="App">
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/signUp" exact element={<SignUp />} />
                <Route path="/About" exact element={<About />} />
                <Route path="/Contact" exact element={<Contact />} />
            </Routes>
        </Router>

    </div>;

}

export default App
