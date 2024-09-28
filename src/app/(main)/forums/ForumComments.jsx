"use client";

import { useState, useEffect } from "react";
import { List, Avatar, Form, Input, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getForumComments, addComment } from "./actions";

const ForumComments = ({ forumId }) => {
  const [comments, setComments] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forumId]);

  const fetchComments = async () => {
    const result = await getForumComments(forumId);
    if (result.success) {
      setComments(result.comments);
    } else {
      message.error(result.error);
    }
  };

  const handleAddComment = async (values) => {
    const formData = new FormData();
    formData.append("content", values.content);
    formData.append("postId", forumId);

    const result = await addComment(formData);
    if (result.success) {
      setComments([...comments, result.comment]);
      form.resetFields();
      message.success("Comment added successfully");
    } else {
      message.error(result.error);
    }
  };

  return (
    <div className="max-h-[60vh] overflow-y-auto">
      <List
        className="comment-list"
        header={`${comments.length} comments`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar icon={<UserOutlined />}>
                  {comment.author?.username
                    ? comment.author.username[0].toUpperCase()
                    : "A"}
                </Avatar>
              }
              title={comment.author?.username || "Anonymous"}
              description={new Date(comment.createdAt).toLocaleString()}
            />
            <div className="comment-content">{comment.content}</div>
          </List.Item>
        )}
      />
      <Form form={form} onFinish={handleAddComment} className="mt-4">
        <Form.Item
          name="content"
          rules={[{ required: true, message: "Please input your comment!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Add Comment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForumComments;
