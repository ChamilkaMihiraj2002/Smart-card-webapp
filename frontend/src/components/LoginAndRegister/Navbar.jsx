import React, { useState, useEffect } from 'react';
import { Layout, Button, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { IdcardOutlined, UserOutlined } from '@ant-design/icons';
import './Navbar.css';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="" className="navbar-logo">
          <div className="logo-animation">
            <IdcardOutlined className="logo-icon" />
          </div>
          <Title level={4} className="logo-text">
            SmartCard
          </Title>
        </Link>
        <div className="nav-right">
          <Space className="auth-buttons">
            <Link to="/login">
              <Button type="text" icon={<UserOutlined />} className="signin-btn">
                Sign In
              </Button>
            </Link>
            <Link to="http://localhost:5173/registration">
              <Button type="primary" className="register-btn">
                Get Started
              </Button>
            </Link>
          </Space>
        </div>
      </div>
    </Header>
  );
};

export default Navbar;