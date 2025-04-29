import React from 'react';
import { Layout } from 'antd';
import Navbar from "../../Navbar/Navbar.jsx";
import styles from './User.module.css';

const { Header, Content } = Layout;

const User = () => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Navbar />
      </Header>
      <Content className={styles.content}>
        <h1>user</h1>
      </Content>
    </Layout>
  );
};

export default User;