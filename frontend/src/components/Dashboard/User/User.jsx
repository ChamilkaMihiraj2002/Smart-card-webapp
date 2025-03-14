import React from 'react';
import { Layout } from "antd";
import Navbar from "../../Navbar/Navbar.jsx";

const { Header, Content, Footer } = Layout;

const User = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Navbar />
      </Header>
      <Content style={{ padding: "20px" }}>
        <h1>Welcome to the User Management</h1>
      </Content>
      <Footer style={{ textAlign: "center" }}>
      User Management Dashboard ©2025 Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default User;
