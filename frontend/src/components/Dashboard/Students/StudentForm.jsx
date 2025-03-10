import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const StudentForm = ({ visible, onCancel, onSave, student }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (student) {
        form.setFieldsValue(student);
      } else {
        form.resetFields();
      }
    }
  }, [visible, student, form]);

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        onSave(values);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={student ? "Edit Student" : "Add New Student"}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      className="student-modal"
    >
      <Form
        form={form}
        layout="vertical"
        className="student-form"
      >
        <Form.Item
          name="stId"
          label="Student ID"
          rules={[
            { required: true, message: 'Please input student ID!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input student name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="StudentClass"
          label="Class"
          rules={[{ required: true, message: 'Please input student class!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="mobile_number"
          label="Mobile Number"
          rules={[
            { required: true, message: 'Please input mobile number!' },
            { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit mobile number!' }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudentForm;