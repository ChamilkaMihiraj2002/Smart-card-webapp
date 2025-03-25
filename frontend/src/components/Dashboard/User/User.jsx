import React, { useState, useEffect } from 'react';
import { Layout, message } from 'antd';
import Navbar from "../../Navbar/Navbar.jsx";
import UserTable from './UserTable';
import UserForm from './UserForm';
import UserProfile from './UserProfile';
import styles from './User.module.css';

const { Header, Content, Footer, Sider } = Layout;

const User = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
    // Simulated current user - in real app, this would come from authentication
    setCurrentUser({
      userId: '1001',
      username: 'admin',
      email: 'admin@example.com'
    });
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      message.error('Failed to fetch users');
    }
  };

  return (
    <Layout className={styles.userManagementLayout}>
      <Header className={styles.header}>
        <Navbar />
      </Header>
      <Layout>
        <Sider width={300} className={styles.sider}>
          <UserProfile user={currentUser} />
        </Sider>
        <Content className={styles.content}>
          <UserForm 
            users={users} 
            setUsers={setUsers} 
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
          <UserTable 
            users={users} 
            setUsers={setUsers}
            setSelectedUser={setSelectedUser}
          />
        </Content>
      </Layout>
      <Footer className={styles.footer}>
        User Management Dashboard ©2025 Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default User;