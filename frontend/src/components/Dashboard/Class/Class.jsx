import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Modal, Form, Input, Card, Space, Typography, message, Select } from 'antd';
import { UserOutlined, ClockCircleOutlined, PlusOutlined, EditOutlined, DeleteOutlined, BookOutlined, CalendarOutlined } from '@ant-design/icons';
import Navbar from "../../Navbar/Navbar.jsx";
import { useNavigate } from 'react-router-dom';
import styles from './Class.module.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Option } = Select;

const Class = () => {
  const [classes, setClasses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  // Add function to get auth headers
  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  // Fetch all classes
  const fetchClasses = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/classes', {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch classes');
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received');
      }

      setClasses(data);
      setLoading(false);
    } catch (error) {
      if (error.message === 'Unauthorized') {
        message.error('Please login to access this resource');
        navigate('/login');
      } else {
        message.error('Failed to fetch classes: ' + error.message);
      }
      console.error('Error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      message.error('Please login to access this page');
      navigate('/login');
      return;
    }
    fetchClasses();
  }, [navigate]);

  const showModal = (record) => {
    form.resetFields();
    if (record) {
      form.setFieldsValue(record);
    }
    setEditingClass(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
    setEditingClass(null);
  };

  // Handle form submission for both add and edit
  const handleFinish = async (values) => {
    try {
      const url = editingClass 
        ? `http://localhost:3000/api/classes/${editingClass.classId}`
        : 'http://localhost:3000/api/classes';
      
      const method = editingClass ? 'PUT' : 'POST';
      
      const requestBody = {
        classId: values.classId,
        teacher: values.teacher,
        subject: values.subject,
        weekday: values.weekday,
        time: values.time
      };

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Operation failed');
      }

      const data = await response.json();
      message.success(`Class ${editingClass ? 'updated' : 'added'} successfully`);
      await fetchClasses();
      setIsModalVisible(false);
      setEditingClass(null);
      form.resetFields();
    } catch (error) {
      if (error.message.includes('unauthorized')) {
        message.error('Please login to perform this action');
        navigate('/login');
      } else {
        message.error('Operation failed: ' + error.message);
      }
      console.error('Error:', error);
    }
  };

  // Handle class deletion
  const handleDelete = (classId) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this class?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      maskClosable: true,
      centered: true,
      onOk: async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/classes/${classId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
          });

          if (!response.ok) {
            if (response.status === 401) {
              message.error('Please login to perform this action');
              navigate('/login');
              return;
            }
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete class');
          }

          message.success('Class deleted successfully');
          await fetchClasses();
        } catch (error) {
          message.error('Failed to delete class: ' + error.message);
          console.error('Error:', error);
        }
      },
      onCancel() {
        message.info('Delete cancelled');
      },
    });
  };

  // Update columns to use _id instead of classId
  const columns = [
    { 
      title: 'Class ID',
      dataIndex: 'classId',
      key: 'classId',
      render: (text) => <Button type="text" strong>{text}</Button>
    },
    { 
      title: 'Teacher',
      dataIndex: 'teacher',
      key: 'teacher',
      render: (text) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      )
    },
    { 
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (text) => (
        <Space>
          <ClockCircleOutlined />
          {text}
        </Space>
      )
    },
    { 
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text) => (
        <Space>
          <BookOutlined />
          {text}
        </Space>
      )
    },
    { 
      title: 'Weekday',
      dataIndex: 'weekday',
      key: 'weekday',
      render: (text) => (
        <Space>
          <CalendarOutlined />
          {text}
        </Space>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
          >
            Edit
          </Button>
          <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(record.classId);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Add this before the return statement
  const filteredClasses = classes.filter(classItem => 
    classItem.classId.toLowerCase().includes(searchText.toLowerCase()) ||
    classItem.teacher.toLowerCase().includes(searchText.toLowerCase()) ||
    classItem.subject.toLowerCase().includes(searchText.toLowerCase()) ||
    classItem.weekday.toLowerCase().includes(searchText.toLowerCase()) ||
    classItem.time.toLowerCase().includes(searchText.toLowerCase())
  );

  const [form] = Form.useForm();

  return (
    <Layout className={styles.layout}>
      <Header>
        <Navbar />
      </Header>
      <Content className={styles.content}>
        <Card>
          <Space direction="horizontal" style={{ width: '100%', justifyContent: 'space-between', marginBottom: '16px' }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => showModal(null)}
              size="large"
            >
              Add New Class
            </Button>
            <Input.Search
              placeholder="Search classes..."
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '300px' }}
            />
          </Space>
          <Table 
            dataSource={filteredClasses} // Changed from classes to filteredClasses
            columns={columns} 
            rowKey="_id" 
            loading={loading}
            className={styles.table}
            bordered
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </Content>
      <Footer className={styles.footer}>
        Class Management Dashboard ©2025 Created with Ant Design
      </Footer>
      <Modal
        title={editingClass ? "Edit Class" : "Add New Class"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleFinish}
          initialValues={editingClass}
          layout="vertical"
        >
          <Form.Item
            name="classId"
            label="Class ID"
            rules={[{ required: true, message: 'Please input class ID!' }]}
          >
            <Input 
              placeholder="Enter class ID"
              disabled={!!editingClass}
            />
          </Form.Item>
          <Form.Item
            name="teacher"
            label="Teacher Name"
            rules={[{ required: true, message: 'Please input teacher name!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter teacher name" />
          </Form.Item>

          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please select subject!' }]}
          >
            <Input prefix={<BookOutlined />} placeholder="Enter subject name" />
          </Form.Item>

          <Form.Item
            name="weekday"
            label="Weekday"
            rules={[{ required: true, message: 'Please select weekday!' }]}
          >
            <Select placeholder="Select weekday">
              <Option value="Monday">Monday</Option>
              <Option value="Tuesday">Tuesday</Option>
              <Option value="Wednesday">Wednesday</Option>
              <Option value="Thursday">Thursday</Option>
              <Option value="Friday">Friday</Option>
              <Option value="Saturday">Saturday</Option>
              <Option value="Sunday">Sunday</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="time"
            label="Class Time"
            rules={[{ required: true, message: 'Please input class time!' }]}
          >
            <Input prefix={<ClockCircleOutlined />} placeholder="Enter class time" />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingClass ? 'Update' : 'Add'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Class;