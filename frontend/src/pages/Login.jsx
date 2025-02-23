import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // TODO: Implement your login logic here
      console.log('Received values:', values);
      message.success('Login successful!');
      navigate('/dashboard'); // Navigate to dashboard after successful login
    } catch (error) {
      message.error('Login failed. Please try again.');
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
              Don't have an account? <a href="/register">Register here</a>
            </Typography.Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;