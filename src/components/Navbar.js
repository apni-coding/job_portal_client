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
      <Item key="forgot-password">
        <Link to="/addjob">add job</Link>
      </Item>
    </Menu>
  );
};

export default Navbar;
