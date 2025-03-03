import React from 'react';
import { Layout } from "antd";
import Navbar from "../../Navbar/Navbar.jsx";

const { Header, Content, Footer } = Layout;

const Attendance = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Navbar />
      </Header>
      <Content style={{ padding: "20px" }}>
        <h1>Welcome to the Attendance Management</h1>
      </Content>
      <Footer style={{ textAlign: "center" }}>
      Attendance Management Dashboard ©2025 Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default Attendance;
