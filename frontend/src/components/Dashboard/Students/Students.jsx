import React, { useState } from 'react';
import { Layout, Table, Button } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import Navbar from "../../Navbar/Navbar.jsx";
import StudentForm from './StudentForm';
import StudentActions from './StudentActions';
import './Students.css';

const { Header, Content, Footer } = Layout;

const Students = () => {
  const [students, setStudents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <StudentActions 
          student={record} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      ),
    },
  ];

  const handleAdd = () => {
    setEditingStudent(null);
    setIsModalVisible(true);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setIsModalVisible(true);
  };

  const handleDelete = (studentId) => {
    setStudents(students.filter(student => student.studentId !== studentId));
  };

  const handleSave = (values) => {
    if (editingStudent) {
      setStudents(students.map(student =>
        student.studentId === editingStudent.studentId ? { ...values } : student
      ));
    } else {
      setStudents([...students, { ...values, key: values.studentId }]);
    }
    setIsModalVisible(false);
  };

  return (
    <Layout className="student-layout">
      <Header>
        <Navbar />
      </Header>
      <Content className="student-content">
        <div className="action-bar">
          <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
            Add New Student
          </Button>
          {/* You can add more action buttons here */}
        </div>
        <Table 
          className="student-table"
          columns={columns} 
          dataSource={students}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            responsive: true
          }}
          scroll={{ x: true }}
          locale={{
            emptyText: 'No students found'
          }}
        />

        <StudentForm
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onSave={handleSave}
          student={editingStudent}
        />
      </Content>
      <Footer className="student-footer">
        Student Dashboard ©2025 Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default Students;