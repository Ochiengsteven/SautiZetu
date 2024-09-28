"use client";

import { useState } from "react";
import { Card, Button, Modal, Input, Form, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { addForum } from "./actions";
import ForumComments from "./ForumComments";

const ForumsPageClient = ({ initialForums }) => {
  const [forums, setForums] = useState(initialForums);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedForum, setSelectedForum] = useState(null);
  const [form] = Form.useForm();

  const handleAddForum = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => formData.append(key, values[key]));

    const result = await addForum(formData);
    if (result.success) {
      setForums([result.forum, ...forums]);
      setIsModalVisible(false);
      form.resetFields();
      message.success("Forum added successfully");
    } else {
      message.error(result.error);
    }
  };

  return (
    <div className="p-4">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        className="mb-4"
      >
        Add Forum
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forums.map((forum) => (
          <Card
            key={forum.id}
            title={forum.title}
            extra={<a onClick={() => setSelectedForum(forum)}>View Comments</a>}
            className="w-full"
          >
            <p>{forum.content}</p>
            <p>Author: {forum.author.username}</p>
            <p>Comments: {forum._count.comments}</p>
            {forum.bill && <p>Related Bill: {forum.bill.title}</p>}
          </Card>
        ))}
      </div>

      <Modal
        title="Add Forum"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddForum} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="billId" label="Related Bill ID (optional)">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Forum
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {selectedForum && (
        <Modal
          title={selectedForum.title}
          open={!!selectedForum}
          onCancel={() => setSelectedForum(null)}
          footer={null}
          width={800}
        >
          <ForumComments forumId={selectedForum.id} />
        </Modal>
      )}
    </div>
  );
};

export default ForumsPageClient;
