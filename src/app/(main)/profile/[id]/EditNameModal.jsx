"use client";

import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { updateUsername } from "./actions";

const EditNameModal = ({ user, visible, onClose, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleEditName = async (values) => {
    setIsLoading(true);
    const result = await updateUsername(user.id, values.username);
    setIsLoading(false);

    if (result.success) {
      message.success("Username updated successfully");
      onUpdate(result.user);
      onClose();
    } else {
      message.error(result.error);
    }
  };

  return (
    <Modal title="Edit Name" open={visible} onCancel={onClose} footer={null}>
      <Form
        onFinish={handleEditName}
        initialValues={{ username: user.username }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="New Username" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update Name
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditNameModal;
