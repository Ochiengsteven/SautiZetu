"use client";

import { useState } from "react";
import { Form, InputNumber, Button, message } from "antd";
import { contributeToFund } from "./actions";

const ContributeForm = ({ crowdfund, onContribution }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("crowdfundId", crowdfund.id);
    formData.append("amount", values.amount);

    const result = await contributeToFund(formData);
    setLoading(false);

    if (result.success) {
      message.success("Contribution added successfully");
      form.resetFields();
      onContribution(result.result.updatedCrowdfund);
    } else {
      message.error(result.error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="amount"
        label="Contribution Amount"
        rules={[{ required: true }]}
      >
        <InputNumber min={0} step={0.01} prefix="$" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Contribute
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContributeForm;
