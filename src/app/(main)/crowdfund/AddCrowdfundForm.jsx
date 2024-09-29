"use client";

import { useState } from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import { createCrowdfund } from "./actions";

const AddCrowdfundForm = ({ onCrowdfundAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    const result = await createCrowdfund(formData);
    setLoading(false);

    if (result.success) {
      message.success("Crowdfund created successfully");
      form.resetFields();
      onCrowdfundAdded(result.crowdfund);
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
      <Form.Item
        name="targetAmount"
        label="Target Amount"
        rules={[{ required: true }]}
      >
        <InputNumber min={0} step={0.01} prefix="$" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Crowdfund
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCrowdfundForm;
