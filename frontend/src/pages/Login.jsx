import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/LoginAndRegister/Navbar';
import axios from 'axios'; // Make sure to install axios
import './Login.css';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        username: values.username,
        password: values.password
      });

      if (response.data && response.data.success && response.data.accessToken) {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.accessToken);
        // Set the default Authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        
        message.success({
          content: 'Login successful!',
          duration: 3,
          style: {
            marginTop: '20vh',
          },
        });
        navigate('/dashboard');
      } else {
        message.error({
          content: 'Login failed. Please check your credentials.',
          duration: 4,
          style: {
            marginTop: '20vh',
          },
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle specific error cases
      if (error.response) {
        switch (error.response.status) {
          case 401:
            message.error({
              content: 'Invalid username or password',
              duration: 4,
              style: {
                marginTop: '20vh',
              },
            });
            break;
          case 404:
            message.error({
              content: 'User not found',
              duration: 4,
              style: {
                marginTop: '20vh',
              },
            });
            break;
          default:
            message.error({
              content: error.response.data?.message || 'An error occurred during login',
              duration: 4,
              style: {
                marginTop: '20vh',
              },
            });
        }
      } else {
        message.error({
          content: 'Network error. Please check your connection.',
          duration: 4,
          style: {
            marginTop: '20vh',
          },
        });
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <Card className="login-card">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <LoginOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
          </div>
          <Title level={2} className="login-title">Welcome Back</Title>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Username" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Log in
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center' }}>
              <Typography.Text type="secondary">
                Don&apos;t have an account? <a href="http://localhost:5173/registration">Register here</a>
              </Typography.Text>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;