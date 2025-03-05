import React, { useState } from 'react';
import { Layout, Table, Button, Modal, Form, Input } from 'antd';
import Navbar from "../../Navbar/Navbar.jsx";
import './Class.css';

const { Header, Content, Footer } = Layout;

const initialClasses = [
  { classId: '1', teacher: 'Mr. Smith', time: '10:00 AM' },
  { classId: '2', teacher: 'Ms. Johnson', time: '11:00 AM' },
];

const Class = () => {
  const [classes, setClasses] = useState(initialClasses);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  const showModal = (record) => {
    setEditingClass(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingClass(null);
  };

  const handleFinish = (values) => {
    if (editingClass) {
      setClasses(classes.map(cls => cls.classId === editingClass.classId ? { ...cls, ...values } : cls));
    } else {
      setClasses([...classes, { ...values, classId: (classes.length + 1).toString() }]);
    }
    setIsModalVisible(false);
    setEditingClass(null);
  };

  const handleDelete = (classId) => {
    setClasses(classes.filter(cls => cls.classId !== classId));
  };

  const columns = [
    { title: 'Class ID', dataIndex: 'classId', key: 'classId' },
    { title: 'Teacher', dataIndex: 'teacher', key: 'teacher' },
    { title: 'Time', dataIndex: 'time', key: 'time' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>Edit</Button>
          <Button type="link" onClick={() => handleDelete(record.classId)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <Layout className="layout">
      <Header>
        <Navbar />
      </Header>
      <Content className="content">
        <h1>Welcome to the Class Management</h1>
        <Button type="primary" onClick={() => showModal(null)}>Add New Class</Button>
        <Table dataSource={classes} columns={columns} rowKey="classId" className="table" />
        <Modal
          title={editingClass ? "Edit Class" : "Add New Class"}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            initialValues={editingClass}
            onFinish={handleFinish}
          >
            <Form.Item name="classID" label="ClassID" rules={[{ required: true, message: 'Please input the ClassID!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="teacher" label="Teacher" rules={[{ required: true, message: 'Please input the teacher name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="time" label="Time" rules={[{ required: true, message: 'Please input the class time!' }]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingClass ? "Update" : "Add"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
      <Footer className="footer">
        Class Management Dashboard ©2025 Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default Class;