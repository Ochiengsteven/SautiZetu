"use client";

import { useState } from "react";
import { Form, InputNumber, Button, message } from "antd";
import { initiateWithdrawal } from "./actions";

const WithdrawForm = ({ crowdfund, onWithdrawal }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("crowdfundId", crowdfund.id);
    formData.append("amount", values.amount);

    const result = await initiateWithdrawal(formData);
    setLoading(false);

    if (result.success) {
      message.success("Withdrawal initiated successfully");
      form.resetFields();
      onWithdrawal(result.updatedCrowdfund);
    } else {
      message.error(result.error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="amount"
        label="Withdrawal Amount"
        rules={[{ required: true }]}
      >
        <InputNumber
          min={0}
          max={crowdfund.currentAmount}
          step={0.01}
          prefix="$"
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Initiate Withdrawal
        </Button>
      </Form.Item>
    </Form>
  );
};

export default WithdrawForm;
