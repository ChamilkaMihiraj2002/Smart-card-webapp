import React from 'react';
import { Layout } from "antd";
import Navbar from "../../Navbar/Navbar.jsx";

const { Header, Content, Footer } = Layout;

const Accounting = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Navbar />
      </Header>
      <Content style={{ padding: "20px" }}>
        <h1>Welcome to the Accounting Management</h1>
      </Content>
      <Footer style={{ textAlign: "center" }}>
      Accounting Management Dashboard ©2025 Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default Accounting;
