"use client";

import { useState } from "react";
import { Form, Input, DatePicker, Select, Button, message } from "antd";
import { addBill } from "./actions";

const AddBillForm = ({ onBillAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(
        key,
        values[key] instanceof Date ? values[key].toISOString() : values[key]
      );
    });

    const result = await addBill(formData);
    setLoading(false);

    if (result.success) {
      message.success("Bill added successfully");
      form.resetFields();
      onBillAdded(result.bill);
    } else {
      message.error(result.error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="status" label="Status" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="Proposed">Proposed</Select.Option>
          <Select.Option value="In Committee">In Committee</Select.Option>
          <Select.Option value="Passed">Passed</Select.Option>
          <Select.Option value="Rejected">Rejected</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="proposedBy"
        label="Proposed By"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="proposedDate"
        label="Proposed Date"
        rules={[{ required: true }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Bill
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddBillForm;
