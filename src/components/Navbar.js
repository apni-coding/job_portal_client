import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const { Item } = Menu;

const Navbar = () => {
  return (
    <Menu mode="horizontal" theme="dark">
      <Item key="home">
        <Link to="/">Home</Link>
      </Item>
      <Item key="signup">
        <Link to="/signup">Sign Up</Link>
      </Item>
      <Item key="signin">
        <Link to="/signin">Sign In</Link>
      </Item>
      <Item key="forgot-password">
        <Link to="/forgot-password">Forgot Password</Link>
      </Item>
      <Item key="addjob">
        <Link to="/recruiter/addjob">add job</Link>
      </Item>
      <Item key="myjob">
        <Link to="/recruiter/ownjobs">My Job</Link>
      </Item>
      <Item key="application">
        <Link to="/recruiter/applications">Application</Link>
      </Item>
      <Item key="sapplication">
        <Link to="/recruiter/applications/:id">Single Application</Link>
      </Item>
      <Item key="appliedjobs">
        <Link to="/appliedjobs">Applied jobs</Link>
      </Item>
    </Menu>
  );
};

export default Navbar;
