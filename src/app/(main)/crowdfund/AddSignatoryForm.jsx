"use client";

import { useState } from "react";
import { Form, Select, Button, message } from "antd";
import { addSignatory } from "./actions";

const AddSignatoryForm = ({ crowdfund, onSignatoryAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("crowdfundId", crowdfund.id);
    formData.append("userId", values.userId);

    const result = await addSignatory(formData);
    setLoading(false);

    if (result.success) {
      message.success("Signatory added successfully");
      form.resetFields();
      onSignatoryAdded(result.crowdfund);
    } else {
      message.error(result.error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="userId" label="Select User" rules={[{ required: true }]}>
        <Select>
          {/* You'll need to fetch and populate this list with actual users */}
          <Select.Option value="user1">User 1</Select.Option>
          <Select.Option value="user2">User 2</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Signatory
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddSignatoryForm;
