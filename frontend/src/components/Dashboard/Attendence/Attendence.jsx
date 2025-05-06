import React, { useState, useEffect } from 'react';
import { Layout, Table, message, AutoComplete, Space, Typography, Button, Modal, Form, Input, DatePicker, Card, Row, Col } from "antd";
import axios from 'axios';
import Navbar from "../../Navbar/Navbar.jsx";
import moment from 'moment';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStId, setSelectedStId] = useState('');
  const [selectedClassId, setSelectedClassId] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/attendance/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAttendanceData(response.data);
      setFilteredData(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch attendance data');
      setLoading(false);
    }
  };

  const studentOptions = [...new Set(attendanceData.map(item => item.stId))].map(stId => ({
    value: stId
  }));

  const classOptions = [...new Set(attendanceData.map(item => item.classId))].map(classId => ({
    value: classId
  }));

  useEffect(() => {
    let filtered = attendanceData;
    
    if (selectedStId) {
      filtered = filtered.filter(item => item.stId === selectedStId);
    }
    
    if (selectedClassId) {
      filtered = filtered.filter(item => item.classId === selectedClassId);
    }
    
    setFilteredData(filtered);
  }, [selectedStId, selectedClassId, attendanceData]);

  const handleAddAttendance = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const formattedDate = values.date.format('YYYY-MM-DD');
      
      const attendanceData = {
        attendanceId: values.attendanceId,
        stId: values.stId,
        classId: values.classId,
        date: formattedDate
      };

      await axios.post('http://localhost:3000/api/attendance/', attendanceData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      message.success('Attendance added successfully');
      form.resetFields();
      setIsModalVisible(false);
      fetchAttendance();
    } catch (error) {
      message.error('Failed to add attendance');
    }
  };

  const handleDelete = async (attendanceId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/attendance/${attendanceId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      message.success('Attendance deleted successfully');
      fetchAttendance();
    } catch (error) {
      message.error('Failed to delete attendance');
    }
  };

  const handleEdit = (record) => {
    setEditingAttendance(record);
    setIsEditModalVisible(true);
    form.setFieldsValue({
      ...record,
      date: moment(record.date)
    });
  };

  const handleUpdate = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const formattedDate = values.date.format('YYYY-MM-DD');
      
      const updatedData = {
        attendanceId: editingAttendance.attendanceId,
        stId: values.stId,
        classId: values.classId,
        date: formattedDate
      };

      await axios.put(`http://localhost:3000/api/attendance/${editingAttendance.attendanceId}`, updatedData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      message.success('Attendance updated successfully');
      setIsEditModalVisible(false);
      setEditingAttendance(null);
      form.resetFields();
      fetchAttendance();
    } catch (error) {
      message.error('Failed to update attendance');
    }
  };

  const columns = [
    {
      title: 'Attendance ID',
      dataIndex: 'attendanceId',
      key: 'attendanceId',
    },
    {
      title: 'Student ID',
      dataIndex: 'stId',
      key: 'stId',
    },
    {
      title: 'Class ID',
      dataIndex: 'classId',
      key: 'classId',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.attendanceId)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Navbar />
      </Header>
      <Content style={{ padding: "24px" }}>
        <Card>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Typography.Title level={2}>Attendance Management</Typography.Title>
                </Col>
                <Col>
                  <Button 
                    type="primary" 
                    onClick={() => setIsModalVisible(true)}
                    size="large"
                  >
                    Add New Attendance
                  </Button>
                </Col>
              </Row>
            </Col>

            <Col span={24}>
              <Card>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={8}>
                    <Card title="Filter by Student" size="small">
                      <AutoComplete
                        options={studentOptions}
                        style={{ width: '100%' }}
                        placeholder="Enter Student ID"
                        value={selectedStId}
                        onChange={value => setSelectedStId(value)}
                        filterOption={(inputValue, option) =>
                          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                      />
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <Card title="Filter by Class" size="small">
                      <AutoComplete
                        options={classOptions}
                        style={{ width: '100%' }}
                        placeholder="Enter Class ID"
                        value={selectedClassId}
                        onChange={value => setSelectedClassId(value)}
                        filterOption={(inputValue, option) =>
                          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                      />
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24}>
              <Card>
                <Table
                  loading={loading}
                  columns={columns}
                  dataSource={filteredData}
                  rowKey="attendanceId"
                  scroll={{ x: true }}
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `Total ${total} items`
                  }}
                />
              </Card>
            </Col>
          </Row>
        </Card>

        <Modal
          title={<Typography.Title level={4}>Add New Attendance</Typography.Title>}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            onFinish={handleAddAttendance}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="attendanceId"
                  label="Attendance ID"
                  rules={[{ required: true, message: 'Please input attendance ID!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="date"
                  label="Date"
                  rules={[{ required: true, message: 'Please select date!' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="stId"
                  label="Student ID"
                  rules={[{ required: true, message: 'Please input student ID!' }]}
                >
                  <AutoComplete
                    options={studentOptions}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="classId"
                  label="Class ID"
                  rules={[{ required: true, message: 'Please input class ID!' }]}
                >
                  <AutoComplete
                    options={classOptions}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Add Attendance
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title={<Typography.Title level={4}>Edit Attendance</Typography.Title>}
          open={isEditModalVisible}
          onCancel={() => {
            setIsEditModalVisible(false);
            setEditingAttendance(null);
            form.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            onFinish={handleUpdate}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="stId"
                  label="Student ID"
                  rules={[{ required: true, message: 'Please input student ID!' }]}
                >
                  <AutoComplete
                    options={studentOptions}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="classId"
                  label="Class ID"
                  rules={[{ required: true, message: 'Please input class ID!' }]}
                >
                  <AutoComplete
                    options={classOptions}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="date"
                  label="Date"
                  rules={[{ required: true, message: 'Please select date!' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Update Attendance
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <Typography.Text>Attendance Management Dashboard ©2025 Created with Ant Design</Typography.Text>
      </Footer>
    </Layout>
  );
};

export default Attendance;
