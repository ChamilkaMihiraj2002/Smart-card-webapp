import React, { useState } from 'react';
import { Layout, Table, Button, Modal, Form, Input, Card, Space, Typography, message } from 'antd';
import { UserOutlined, ClockCircleOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Navbar from "../../Navbar/Navbar.jsx";
import './Class.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const initialClasses = [
  { classId: '1', teacher: 'Mr. Smith', time: '10:00 AM' },
  { classId: '2', teacher: 'Ms. Johnson', time: '11:00 AM' },
];

const Class = () => {
  const [classes, setClasses] = useState(initialClasses);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

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

  const handleFinish = (values) => {
    if (editingClass) {
      setClasses(classes.map(cls => 
        cls.classId === editingClass.classId ? { ...cls, ...values } : cls
       ));
      message.success('Class updated successfully');
    } else {
      const maxId = Math.max(...classes.map(cls => parseInt(cls.classId)), 0);
      const newClassId = (maxId + 1).toString();
      setClasses([...classes, { ...values, classId: newClassId }]);
      message.success('Class added successfully');
    }
    setIsModalVisible(false);
    setEditingClass(null);
    form.resetFields();
  };

  const handleDelete = (classId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this class?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setClasses(classes.filter(cls => cls.classId !== classId));
        message.success('Class deleted successfully');
      },
    });
  };

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
            onClick={() => handleDelete(record.classId)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const [form] = Form.useForm();

  return (
    <Layout className="layout">
      <Header>
        <Navbar />
      </Header>
      <Content className="content">
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => showModal(null)}
              size="large"
              style={{ marginBottom: '16px' }}
            >
              Add New Class
            </Button>
            <Table 
              dataSource={classes} 
              columns={columns} 
              rowKey="classId" 
              className="table"
              bordered
              pagination={{ pageSize: 5 }}
            />
          </Space>
        </Card>
      </Content>
      <Footer className="footer">
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
            name="teacher"
            label="Teacher Name"
            rules={[{ required: true, message: 'Please input teacher name!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter teacher name" />
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