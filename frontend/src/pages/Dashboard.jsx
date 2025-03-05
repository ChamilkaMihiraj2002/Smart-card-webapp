import React, { useState, useEffect } from "react"; // Add useEffect
import { Layout, Card, Row, Col, Statistic, Image } from "antd";
import { 
  UserOutlined, 
  TeamOutlined, 
  BookOutlined, 
  CalendarOutlined 
} from '@ant-design/icons';
import Navbar from "../components/Navbar/Navbar";
import './Dashboard.css';

const { Header, Content, Footer } = Layout;

const Dashboard = () => {
  const [currentDate] = useState(new Date().toLocaleDateString());
  const [stats, setStats] = useState({
    studentCount: 0,
    classCount: 0,
    userCount: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        // Fetch all stats in parallel
        const [studentsRes, classesRes, usersRes] = await Promise.all([
          fetch('http://localhost:3000/api/students/count', { headers }),
          fetch('http://localhost:3000/api/classes/count', { headers }),
          fetch('http://localhost:3000/api/users/count', { headers })
        ]);

        const studentData = await studentsRes.json();
        const classData = await classesRes.json();
        const userData = await usersRes.json();

        setStats({
          studentCount: studentData.count,
          classCount: classData.count,
          userCount: userData.count
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <Layout className="dashboard-container">
      <Header>
        <Navbar />
      </Header>
      <Content className="dashboard-content">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card className="stat-card">
              <Statistic
                className="students-stat"
                title="Total Students"
                value={stats.studentCount}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Card className="stat-card">
              <Statistic
                className="classes-stat"
                title="Total Classes"
                value={stats.classCount}
                prefix={<BookOutlined />}
              />
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Card className="stat-card">
              <Statistic
                className="users-stat"
                title="Total Users"
                value={stats.userCount}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Card className="stat-card">
              <Statistic
                className="date-stat"
                title="Current Date"
                value={currentDate}
                prefix={<CalendarOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Add new image section */}
        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col span={24}>
            <Card className="dashboard-image-card">
              <div className="dashboard-image-container">
                <Image
                  src="/path-to-your-image.jpg" // Replace with your image path
                  alt="Dashboard Overview"
                  style={{
                    width: '100%',
                    maxHeight: '300px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer className="dashboard-footer">
        Dashboard ©2025 Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default Dashboard;