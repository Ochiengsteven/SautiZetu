"use client";

import { useState } from "react";
import { Avatar, Typography, Button, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import EditNameModal from "./EditNameModal";
import ChangePasswordModal from "./ChangePasswordModal";
import AvatarUpload from "./AvatarUpload";

const ProfileContent = ({ initialUser }) => {
  const [user, setUser] = useState(initialUser);
  const [isEditNameModalVisible, setEditNameModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setChangePasswordModalVisible] =
    useState(false);

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative inline-block">
        <Avatar size={64} src={user.avatarUrl} />
        <div className="absolute bottom-0 right-0">
          <AvatarUpload user={user} onUpdate={handleUserUpdate} />
        </div>
      </div>
      <Typography.Title level={2} className="mt-4">
        {user.username}
      </Typography.Title>

      <Space className="mt-4">
        <Button
          icon={<EditOutlined />}
          onClick={() => setEditNameModalVisible(true)}
        >
          Edit Name
        </Button>
        <Button
          icon={<EditOutlined />}
          onClick={() => setChangePasswordModalVisible(true)}
        >
          Change Password
        </Button>
      </Space>

      <EditNameModal
        user={user}
        visible={isEditNameModalVisible}
        onClose={() => setEditNameModalVisible(false)}
        onUpdate={handleUserUpdate}
      />

      <ChangePasswordModal
        user={user}
        visible={isChangePasswordModalVisible}
        onClose={() => setChangePasswordModalVisible(false)}
      />
    </div>
  );
};

export default ProfileContent;
