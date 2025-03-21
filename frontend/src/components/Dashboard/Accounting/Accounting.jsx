import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Card, Table, Row, Col, Statistic, Spin, Alert, Tooltip, Typography, Button, Space } from "antd";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { InfoCircleOutlined, DollarOutlined, TeamOutlined, SyncOutlined, CheckCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import Navbar from "../../Navbar/Navbar.jsx";
import styles from './Accounting.module.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Accounting = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearSummary, setYearSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Extract fetch logic into a reusable function
  const fetchAccountingData = useCallback(async (showRefreshing = false) => {
    try {
      if (showRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      // Set headers with authentication token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      // Fetch monthly income data
      const monthlyResponse = await axios.get('http://localhost:3000/api/accounting/yearly-income', config);
      
      // Fetch year summary data
      const summaryResponse = await axios.get('http://localhost:3000/api/accounting/total-income', config);
      
      // Sort monthly data by month number for proper display
      const monthOrder = {
        'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
        'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
      };
      
      const sortedMonthlyData = monthlyResponse.data.sort((a, b) => monthOrder[a.month] - monthOrder[b.month]);
      
      setMonthlyData(sortedMonthlyData);
      setYearSummary(summaryResponse.data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Error fetching accounting data:', err);
      setError('Failed to load accounting data. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    fetchAccountingData();
  }, [fetchAccountingData]);

  // Setup periodic refresh every 5 minutes
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      fetchAccountingData(true);
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    return () => clearInterval(refreshInterval);
  }, [fetchAccountingData]);

  // Handle manual refresh
  const handleRefresh = () => {
    fetchAccountingData(true);
  };

  const columns = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
      className: styles.monthColumn,
    },
    {
      title: 'Total Income',
      dataIndex: 'totalIncome',
      key: 'totalIncome',
      render: (value) => 'Rs. ' + `${value.toLocaleString()}`,
      sorter: (a, b) => a.totalIncome - b.totalIncome,
    },
    {
      title: 'Student Count',
      dataIndex: 'studentCount',
      key: 'studentCount',
      sorter: (a, b) => a.studentCount - b.studentCount,
    },
    {
      title: 'Average Per Student',
      key: 'average',
      render: (record) => 'Rs. ' + `${(record.totalIncome / record.studentCount).toLocaleString()}`,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Navbar />
      </Header>
      <Content style={{ padding: "20px" }}>
        <div className={styles.accountingContainer}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Title level={2} className={styles.pageTitle}>
              Accounting Management Dashboard
            </Title>
            <Space>
              {lastUpdated && (
                <span style={{ color: '#8c8c8c', fontSize: '14px' }}>
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '5px' }} />
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <Button 
                type="primary" 
                icon={<SyncOutlined spin={refreshing} />} 
                onClick={handleRefresh}
                loading={refreshing}
              >
                {refreshing ? 'Refreshing...' : 'Refresh Data'}
              </Button>
            </Space>
          </div>

          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: 24 }}
              action={
                <Button size="small" type="primary" onClick={handleRefresh}>
                  Try Again
                </Button>
              }
            />
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <Spin size="large" />
              <p style={{ marginTop: 16 }}>Loading accounting data...</p>
            </div>
          ) : (
            <>
              {/* Year Summary Cards */}
              <Row gutter={16} className={styles.cardContainer}>
                <Col xs={24} sm={8}>
                  <Card className={styles.summaryCard}>
                    <Statistic
                      title={<span className={styles.summaryLabel}>Total Annual Income</span>}
                      value={yearSummary?.total || 0}
                      prefix="Rs."
                      valueStyle={{ color: 'white' }}
                      className={styles.summaryValue}
                    />
                    <DollarOutlined style={{ fontSize: 24 }} />
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card className={styles.summaryCard}>
                    <Statistic
                      title={<span className={styles.summaryLabel}>Total Fees Collected</span>}
                      value={yearSummary?.feeCount || 0}
                      valueStyle={{ color: 'white' }}
                      className={styles.summaryValue}
                    />
                    <InfoCircleOutlined style={{ fontSize: 24 }} />
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card className={styles.summaryCard}>
                    <Statistic
                      title={<span className={styles.summaryLabel}>Average Fee Amount</span>}
                      value={yearSummary?.total && yearSummary?.feeCount ? (yearSummary.total / yearSummary.feeCount) : 0}
                      prefix="Rs."
                      precision={2}
                      valueStyle={{ color: 'white' }}
                      className={styles.summaryValue}
                    />
                    <TeamOutlined style={{ fontSize: 24 }} />
                  </Card>
                </Col>
              </Row>

              {/* Income Chart */}
              <Card 
                title="Monthly Income" 
                className={styles.chartContainer} 
                style={{ height: '400px', marginBottom: '24px' }}
                extra={refreshing && <Spin size="small" />}
              >
                {monthlyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={monthlyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="totalIncome" fill="#1890ff" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div>No data available for chart</div>
                )}
              </Card>

              {/* Monthly Details Table */}
              <Card 
                title={
                  <span>
                    Monthly Income Details
                    <Tooltip title="Detailed monthly breakdown of income and student count">
                      <InfoCircleOutlined className={styles.infoIcon} />
                    </Tooltip>
                  </span>
                }
                className={styles.tableContainer}
                extra={refreshing && <Spin size="small" />}
              >
                <Table 
                  columns={columns}
                  dataSource={monthlyData.map((item, index) => ({ ...item, key: index }))}
                  pagination={false}
                  bordered
                />
              </Card>
            </>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Accounting Management Dashboard ©2025 Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default Accounting;