import React, { useState, useEffect } from "react"; // Add useEffect
import { Layout, Card, Row, Col, Statistic, List, Typography } from "antd";
import { 
  UserOutlined, 
  TeamOutlined, 
  BookOutlined, 
  CalendarOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import Navbar from "../components/Navbar/Navbar";
import './Dashboard.css';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
  const [currentDate] = useState(new Date().toLocaleDateString());
  const [stats, setStats] = useState({
    studentCount: 0,
    classCount: 0,
    userCount: 0
  });
  const [todayClasses, setTodayClasses] = useState([]);
  const [loading, setLoading] = useState(true);

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

    const fetchTodayClasses = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        // Get current weekday (0 = Sunday, 1 = Monday, etc.)
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'saturday'];
        const today = new Date();
        const weekday = weekdays[today.getDay()];
        
        const response = await fetch(`http://localhost:3000/api/classes/day/${weekday}`, { headers });
        const data = await response.json();
        
        setTodayClasses(data);
      } catch (error) {
        console.error('Error fetching today\'s classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    fetchTodayClasses();
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

        {/* Today's Classes Section */}
        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col span={24}>
            <Card 
              title={
                <div className="today-classes-header">
                  <Title level={4}>Today's Classes</Title>
                  <Text type="secondary">{new Date().toLocaleDateString('en-US', {weekday: 'long'})}</Text>
                </div>
              }
              className="today-classes-card"
              loading={loading}
            >
              {todayClasses.length > 0 ? (
                <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
                  dataSource={todayClasses}
                  renderItem={(item) => (
                    <List.Item>
                      <Card 
                        className="class-card"
                        hoverable
                      >
                        <div className="class-card-subject">
                          <BookOutlined className="subject-icon" />
                          <Title level={5}>{item.subject}</Title>
                        </div>
                        <div className="class-card-time">
                          <ClockCircleOutlined className="time-icon" />
                          <Text>{item.time}</Text>
                        </div>
                        <div className="class-card-details">
                          <Text type="secondary" style={{ display: 'block', marginTop: '8px' }}>
                            <UserOutlined style={{ marginRight: '8px' }} />
                            {item.teacher}
                          </Text>
                          <Text type="secondary">
                            <span className="class-id-badge">{item.classId}</span>
                          </Text>
                        </div>
                      </Card>
                    </List.Item>
                  )}
                />
              ) : (
                <div className="no-classes">
                  <BookOutlined style={{ fontSize: '48px', opacity: 0.3 }} />
                  <Text type="secondary" style={{ fontSize: '16px', marginTop: '16px' }}>No classes scheduled for today</Text>
                </div>
              )}
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