"use client";

import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { changePassword } from "./actions";

const ChangePasswordModal = ({ user, visible, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async (values) => {
    setIsLoading(true);
    const result = await changePassword(user.id, values.password);
    setIsLoading(false);

    if (result.success) {
      message.success("Password changed successfully");
      onClose();
    } else {
      message.error(result.error);
    }
  };

  return (
    <Modal
      title="Change Password"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form onFinish={handleChangePassword}>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your new password!" },
          ]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
