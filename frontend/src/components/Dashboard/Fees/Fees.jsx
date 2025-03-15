import React, { useState, useEffect } from 'react';
import { Layout, Card, Button, Modal, Form, Input, InputNumber, Select, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import Navbar from "../../Navbar/Navbar.jsx";
import axios from 'axios';
import style from './Fees.module.css';

const { Header, Content, Footer } = Layout;

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFee, setEditingFee] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  useEffect(() => {
    if (!token) {
      message.error('Please login to access this page');
      return;
    }
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/fees', config);
      setFees(response.data);
    } catch (error) {
      message.error('Failed to fetch fees');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingFee(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (fee) => {
    setEditingFee(fee);
    form.setFieldsValue(fee);
    setIsModalVisible(true);
  };

  const handleDelete = async (feeId) => {
    try {
      await axios.delete(`http://localhost:3000/api/fees/${feeId}`, config);
      message.success('Fee deleted successfully');
      fetchFees();
    } catch (error) {
      message.error('Failed to delete fee');
      console.error('Error:', error);
    }
  };

  const handleSave = async (values) => {
    try {
      const feeData = {
        classId: values.classId,
        stId: values.stId,
        amount: values.amount,
        month: values.month
      };

      if (editingFee) {
        await axios.put(
          `http://localhost:3000/api/fees/${editingFee.id}`,
          feeData,
          config
        );
        message.success('Fee updated successfully');
      } else {
        await axios.post(
          'http://localhost:3000/api/fees',
          feeData,
          config
        );
        message.success('Fee added successfully');
      }
      setIsModalVisible(false);
      fetchFees();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to save fee';
      message.error(errorMsg);
      console.error('Error:', error);
    }
  };

  const filteredFees = fees.filter(fee => 
    fee.stId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fee.classId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fee.month.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout className={style.feesLayout}>
      <Header>
        <Navbar />
      </Header>
      <Content className={style.feesContent}>
        <div className={style.feesHeader}>
          <h1>Fees Management</h1>
          <div className={style.headerActions}>
            <Input
              placeholder="Search by ID or Month"
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={style.searchInput}
              allowClear
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
              className={style.addButton}
            >
              Add New Fee
            </Button>
          </div>
        </div>
        <div className={style.feesGrid}>
          {filteredFees.map(fee => (
            <Card
              key={fee.id}
              className={style.feeCard}
              title={
                <div className={style.cardTitle}>
                  <span>{fee.feeName}</span>
                  <UserOutlined className={style.userIcon} />
                </div>
              }
              actions={[
                <Button
                  key="edit"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(fee)}
                  className={style.editButton}
                />,
                <Button
                  key="delete"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(fee.id)}
                  className={style.deleteButton}
                />
              ]}
            >
              <div className={style.cardContent}>
                <h3>Student ID: {fee.stId}</h3>
                <div className={style.classId}>Class ID: {fee.classId}</div>
                <div className={style.feeAmount}>${fee.amount}</div>
                <div className={style.feeMonth}>Month: {fee.month}</div>
              </div>
            </Card>
          ))}
        </div>

        <Modal
          title={editingFee ? "Edit Fee" : "Add New Fee"}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            onFinish={handleSave}
            layout="vertical"
          >
            <Form.Item
              name="classId"
              label="Class ID"
              rules={[{ required: true, message: 'Please input the class ID!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="stId"
              label="Student ID"
              rules={[{ required: true, message: 'Please input the student ID!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="amount"
              label="Amount"
              rules={[
                { required: true, message: 'Please input the amount!' },
                { 
                  validator: (_, value) => {
                    if (value >= 800 && value <= 2500) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Amount must be between 800 and 2500');
                  }
                }
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={800}
                max={2500}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
            <Form.Item
              name="month"
              label="Month"
              rules={[{ required: true, message: 'Please select the month!' }]}
            >
              <Select>
                <Select.Option value="January">January</Select.Option>
                <Select.Option value="February">February</Select.Option>
                <Select.Option value="March">March</Select.Option>
                <Select.Option value="April">April</Select.Option>
                <Select.Option value="May">May</Select.Option>
                <Select.Option value="June">June</Select.Option>
                <Select.Option value="July">July</Select.Option>
                <Select.Option value="August">August</Select.Option>
                <Select.Option value="September">September</Select.Option>
                <Select.Option value="October">October</Select.Option>
                <Select.Option value="November">November</Select.Option>
                <Select.Option value="December">December</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {editingFee ? 'Update Fee' : 'Add Fee'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
      <Footer className={style.feesFooter}>
        Fees Management Dashboard ©2025 Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default Fees;
