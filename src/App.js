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
import Application from "./components/recruiter/Application";
import SingleApplicationInfo from "./components/recruiter/SingleApplicationInfo";
import AppliedJobs from "./components/Applicant/AppliedJobs";
import MyProfile from "./components/MyProfile";

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
          <Route path="/recruiter/applications" element={<Application />} />
          <Route path="/recruiter/applications/:id" element={<SingleApplicationInfo />} />
          <Route path="/appliedjobs" element={<AppliedJobs />} />
          <Route path="/myprofile" element={<MyProfile />} />


          
          
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
