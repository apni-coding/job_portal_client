import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import ForgotPassword from './components/auth/ForgotPassword';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Navbar from "./components/Navbar";
import PasswordUpdate from "./components/auth/PasswordUpdate";
import AddJob from "./components/recruiter/AddJob";
import Home from "./components/Applicant/Home";
import OwnJobList from "./components/recruiter/OwnJobList";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/recruiter/addjob" element={<AddJob />} />
          <Route path="/recruiter/ownjobs" element={<OwnJobList />} />
          
          
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
