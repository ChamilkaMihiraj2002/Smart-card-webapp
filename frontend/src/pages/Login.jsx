import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
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
        
        message.success('Login successful!');
        navigate('/dashboard');
      } else {
        message.error('Login failed. Invalid response from server.');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
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
              Don&apos;t have an account? <a href="/register">Register here</a>
            </Typography.Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;