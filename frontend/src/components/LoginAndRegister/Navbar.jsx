import React from 'react';
import { Layout, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { IdcardOutlined } from '@ant-design/icons';
import './Navbar.css';

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header className="navbar">
      <div className="navbar-logo">
        <IdcardOutlined className="logo-icon" />
        <span className="logo-text">Smart Card</span>
      </div>
      <Space className="auth-buttons">
        <Link to="/login">
          <Button type="text">Sign In</Button>
        </Link>
        <Link to="/register">
          <Button type="primary">Register</Button>
        </Link>
      </Space>
    </Header>
  );
};

export default Navbar;