import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, IdcardOutlined, FormOutlined } from '@ant-design/icons';
import './Registration.css';

const Registration = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // Here you would typically make an API call to register the user
      console.log('Registration values:', values);
      message.success('Registration successful!');
      form.resetFields();
    } catch (error) {
      message.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-container">
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FormOutlined style={{ marginRight: '8px' }} />
            Registration
          </div>
        } 
        className="registration-card"
      >
        <Form
          form={form}
          name="registration"
          onFinish={onFinish}
          layout="vertical"
          scrollToFirstError
        >
          <Form.Item
            label="User ID"
            name="userId"
            rules={[
              {
                required: true,
                message: 'Please input your User ID!',
              },
            ]}
          >
            <Input
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              placeholder="Enter your User ID"
            />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Enter your username"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Please enter a valid email!',
              },
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 8,
                message: 'Password must be at least 8 characters!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register Now
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Registration;