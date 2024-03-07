import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import ForgotPassword from './components/auth/ForgotPassword';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Navbar from "./components/Navbar";
import PasswordUpdate from "./components/auth/PasswordUpdate";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
