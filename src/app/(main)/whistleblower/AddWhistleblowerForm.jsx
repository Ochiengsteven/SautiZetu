"use client";

import { useState } from "react";
import { Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { addWhistleblowerReport } from "./actions";

const { TextArea } = Input;

const AddWhistleblowerForm = ({ onReportAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);

    // Handle file uploads
    if (values.evidence && values.evidence.fileList) {
      values.evidence.fileList.forEach((file) => {
        formData.append("evidence", file.originFileObj);
      });
    }

    const result = await addWhistleblowerReport(formData);
    setLoading(false);

    if (result.success) {
      message.success("Report added successfully");
      form.resetFields();
      onReportAdded(result.report);
    } else {
      message.error(result.error);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="evidence"
        label="Evidence"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          listType="picture"
          beforeUpload={() => false} // Prevent auto-upload
          multiple
        >
          <Button icon={<UploadOutlined />}>
            Upload evidence (Images, Videos, PDFs)
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit Report
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddWhistleblowerForm;
