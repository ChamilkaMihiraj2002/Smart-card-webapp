import React from "react";
import { Menu } from "antd";
import { DashboardOutlined, UserOutlined, TeamOutlined, BookOutlined, DollarOutlined, BankOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const items = [
    { label: "Dashboard", key: "dashboard", icon: <DashboardOutlined /> },
    { label: "Students", key: "students", icon: <UserOutlined /> },
    { label: "Class", key: "class", icon: <BookOutlined /> },
    { label: "Attendance", key: "attendance", icon: <TeamOutlined /> },
    { label: "Fees", key: "fees", icon: <DollarOutlined /> },
    { label: "Accounting", key: "accounting", icon: <BankOutlined /> },
    { label: "User", key: "user", icon: <UserOutlined /> },
  ];

  const handleClick = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      onClick={handleClick}
      items={items}
    />
  );
};

export default Navbar;
