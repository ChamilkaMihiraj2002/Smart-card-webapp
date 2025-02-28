import React from "react";
import { Layout } from "antd";
import Navbar from "../components/Navbar/Navbar";

const { Header, Content, Footer } = Layout;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Navbar />
      </Header>
      <Content style={{ padding: "20px" }}>
        <h1>Welcome to the Dashboard</h1>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Dashboard ©2025 Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default Dashboard;
