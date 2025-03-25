import React from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './UserTable.module.css';

const UserTable = ({ users, setUsers, setSelectedUser }) => {
  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setUsers(users.filter(user => user.userId !== userId));
        message.success('User deleted successfully');
      } else {
        message.error('Failed to delete user');
      }
    } catch (error) {
      message.error('Error deleting user');
    }
  };

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div className={styles.actionButtons}>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => setSelectedUser(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record.userId)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              danger 
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.userTableContainer}>
      <Table 
        columns={columns} 
        dataSource={users} 
        rowKey="userId"
        pagination={{ 
          pageSize: 5, 
          showSizeChanger: true 
        }}
      />
    </div>
  );
};

export default UserTable;