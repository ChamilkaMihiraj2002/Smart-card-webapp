import React from 'react';
import { Button, Space, Popconfirm } from 'antd';

const StudentActions = ({ student, onEdit, onDelete }) => {
  return (
    <Space>
      <Button 
        type="primary" 
        onClick={() => onEdit(student)}
        className="edit-button"
      >
        Edit
      </Button>
      <Popconfirm
        title="Are you sure you want to delete this student?"
        onConfirm={() => onDelete(student.studentId)}
        okText="Yes"
        cancelText="No"
      >
        <Button 
          type="primary" 
          danger
          className="delete-button"
        >
          Delete
        </Button>
      </Popconfirm>
    </Space>
  );
};

export default StudentActions;