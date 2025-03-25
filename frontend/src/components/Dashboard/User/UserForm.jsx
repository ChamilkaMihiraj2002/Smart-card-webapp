import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import styles from './UserForm.module.css';

const UserForm = ({ users, setUsers, selectedUser, setSelectedUser }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue(selectedUser);
    } else {
      form.resetFields();
    }
  }, [selectedUser, form]);

  const onFinish = async (values) => {
    try {
      let response;
      if (selectedUser) {
        // Update existing user
        response = await fetch(`http://localhost:3000/api/users/${selectedUser.userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        });
      } else {
        // Add new user
        response = await fetch('http://localhost:3000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        });
      }

      if (response.ok) {
        const updatedUser = await response.json();
        
        if (selectedUser) {
          // Update existing user in the list
          setUsers(users.map(user => 
            user.userId === selectedUser.userId ? updatedUser : user
          ));
          message.success('User updated successfully');
        } else {
          // Add new user to the list
          setUsers([...users, updatedUser]);
          message.success('User added successfully');
        }

        // Reset form and selected user
        form.resetFields();
        setSelectedUser(null);
      } else {
        message.error('Failed to save user');
      }
    } catch (error) {
      message.error('Error saving user');
    }
  };

  return (
    <div className={styles.userFormContainer}>
      <Form
        form={form}
        name="user_form"
        onFinish={onFinish}
        layout="vertical"
        className={styles.userForm}
      >
        <Form.Item
          name="userId"
          label="User ID"
          rules={[{ required: true, message: 'Please input user ID!' }]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Enter User ID" 
            disabled={!!selectedUser}
          />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input username!' }]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Enter Username" 
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { 
              required: true, 
              message: 'Please input email!' 
            },
            {
              type: 'email',
              message: 'Please enter a valid email!'
            }
          ]}
        >
          <Input 
            prefix={<MailOutlined />} 
            placeholder="Enter Email" 
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input password!' }]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Enter Password" 
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            className={styles.submitButton}
          >
            {selectedUser ? 'Update User' : 'Add User'}
          </Button>
          {selectedUser && (
            <Button 
              onClick={() => {
                form.resetFields();
                setSelectedUser(null);
              }}
              className={styles.cancelButton}
            >
              Cancel
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserForm;