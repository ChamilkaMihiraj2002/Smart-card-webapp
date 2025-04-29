import React from "react";
import { Menu } from "antd";
import { 
  DashboardOutlined, 
  UserOutlined, 
  TeamOutlined, 
  BookOutlined, 
  DollarOutlined, 
  BankOutlined,
  LogoutOutlined 
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const menuItems = [
    { label: "Dashboard", key: "dashboard", icon: <DashboardOutlined /> },
    { label: "Students", key: "students", icon: <UserOutlined /> },
    { label: "Class", key: "class", icon: <BookOutlined /> },
    { label: "Attendance", key: "attendance", icon: <TeamOutlined /> },
    { label: "Fees", key: "fees", icon: <DollarOutlined /> },
    { label: "Accounting", key: "accounting", icon: <BankOutlined /> },
    { label: "User", key: "user", icon: <UserOutlined /> },
  ];

  const logoutItem = {
    label: "Logout",
    key: "logout",
    icon: <LogoutOutlined />,
    style: { marginLeft: 'auto' }
  };

  const items = [...menuItems, logoutItem];

  const handleClick = ({ key }) => {
    if (key === 'logout') {
      localStorage.clear();
      navigate('/login');
      return;
    }
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
