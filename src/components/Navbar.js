import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/authAction';

const { Item } = Menu;

const Navbar = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const userRole = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault(); 
    // Dispatch the logout action
    dispatch(logoutUser());
    navigate('/signin');
  };
  

  return (
    <Menu mode="horizontal" theme="dark">
      <Item key="home">
        <Link to="/">Home</Link>
      </Item>
      
      {(isLoggedIn && userRole === 'recruiter') && (
        <>
          <Item key="addjob">
            <Link to="/recruiter/addjob">Add Job</Link>
          </Item>
          <Item key="myjob">
            <Link to="/recruiter/ownjobs">My Job</Link>
          </Item>
          <Item key="application">
            <Link to="/recruiter/applications">Application</Link>
          </Item>
          <Item key="myprofile">
            <Link to="/myprofile">My Profile</Link>
          </Item>
        </>
      )}

      {(isLoggedIn && userRole === 'applicant') && (
        <>
          <Item key="appliedjobs">
            <Link to="/appliedjobs">Applied Jobs</Link>
          </Item>
          <Item key="myprofile">
            <Link to="/myprofile">My Profile</Link>
          </Item>
        </>
      )}
      {!isLoggedIn ? (
        <>
          <Item key="signup">
            <Link to="/signup">Sign Up</Link>
          </Item>
          <Item key="signin">
            <Link to="/signin">Sign In</Link>
          </Item>
        </>
      ) : (
        <Item key="signin">
          <Link onClick={handleLogout}>Log Out</Link>
        </Item>
      )}
    </Menu>
  );
};

export default Navbar;
