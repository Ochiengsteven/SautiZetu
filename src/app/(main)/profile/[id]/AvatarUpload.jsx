"use client";

import { useState } from "react";
import { message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { updateAvatar } from "./actions";

const AvatarUpload = ({ user, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await updateAvatar(user.id, formData);
      if (result.success) {
        message.success("Avatar updated successfully");
        onUpdate(result.user);
      } else {
        message.error(result.error);
      }
    } catch (error) {
      message.error("Failed to update avatar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="avatar-upload-container">
      <label htmlFor="avatar-upload" className="avatar-upload-label">
        <EditOutlined style={{ fontSize: "16px", color: "#fff" }} />
      </label>
      <input
        id="avatar-upload"
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        style={{ display: "none" }}
        disabled={loading}
      />
    </div>
  );
};

export default AvatarUpload;
