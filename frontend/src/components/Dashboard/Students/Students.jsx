import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import Navbar from "../../Navbar/Navbar.jsx";
import StudentForm from './StudentForm';
import StudentActions from './StudentActions';
import axios from 'axios';
import './Students.css';

const { Header, Content, Footer } = Layout;

const Students = () => {
  const [students, setStudents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get auth token from localStorage
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  useEffect(() => {
    if (!token) {
      message.error('Please login to access this page');
      // You might want to add navigation to login page here
      return;
    }
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/students', config);
      setStudents(response.data);
    } catch (error) {
      message.error('Failed to fetch students');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingStudent(null);
    setIsModalVisible(true);
  };

  const handleEdit = (student) => {
    // Ensure the data is in the correct format for the form
    const formattedStudent = {
      stId: student.stId,
      name: student.name,
      age: parseInt(student.age),
      StudentClass: student.StudentClass,
      mobile_number: student.mobile_number
    };
    
    setEditingStudent(formattedStudent);
    setIsModalVisible(true);
  };

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`http://localhost:3000/api/students/${studentId}`, config);
      message.success('Student deleted successfully');
      fetchStudents();
    } catch (error) {
      message.error('Failed to delete student');
      console.error('Error:', error);
    }
  };

  const handleSave = async (values) => {
    try {
      // Clean and validate the data before sending
      const studentData = {
        stId: values.stId.toString(),
        name: values.name.trim(),
        age: parseInt(values.age),
        StudentClass: values.StudentClass.trim(),
        mobile_number: values.mobile_number.toString()
      };

      // Validate required fields
      if (!studentData.stId || !studentData.name || !studentData.age || 
          !studentData.StudentClass || !studentData.mobile_number) {
        message.error('All fields are required');
        return;
      }

      if (editingStudent) {
        // Update existing student
        await axios.put(
          `http://localhost:3000/api/students/${editingStudent.stId}`,
          studentData,
          config
        );
        message.success('Student updated successfully');
        setIsModalVisible(false);
        fetchStudents();
      } else {
        // Add new student
        const response = await axios.post(
          'http://localhost:3000/api/students',
          studentData,
          config
        );
        
        if (response.status === 200 || response.status === 201) {
          message.success('Student added successfully');
          setIsModalVisible(false);
          fetchStudents();
        }
      }
    } catch (error) {
      console.error('Save Error:', error.response?.data || error.message);
      message.error(
        error.response?.data?.message || 
        'Failed to save student. Please check all fields and try again.'
      );
    }
  };

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'stId',  // Changed from studentId to stId
      key: 'stId',
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
      dataIndex: 'StudentClass',  // Changed from class to StudentClass
      key: 'StudentClass',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobile_number',  // Changed from mobileNumber to mobile_number
      key: 'mobile_number',
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