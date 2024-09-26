"use client";
import Link from "next/link";
import React from "react";
import { Avatar, Dropdown, Space } from "antd"; // Added imports
import {
  DownOutlined,
  UserOutlined,
  CheckCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons"; // Added icon import
import { useSession } from "./SessionProvider";
import { logout } from "../(auth)/actions";

const Navbar = () => {
  const { user } = useSession();

  const handleLogout = () => {
    logout();
  };

  const items = [
    // Dropdown menu items
    {
      key: "profile",
      label: (
        <Link href={`/profile/${user.id}`}>
          <Space>
            <UserOutlined /> Profile
          </Space>
        </Link>
      ),
    },
    {
      key: "verify",
      label: (
        <Link href={`/verify/${user.id}`}>
          <Space>
            <CheckCircleOutlined /> Verify Account
          </Space>
        </Link>
      ),
    },
    {
      key: "logout",
      danger: true,
      label: (
        <a onClick={handleLogout}>
          <Space>
            <LogoutOutlined /> Logout
          </Space>
        </a>
      ),
    },
  ];

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="max-w-screen mx-auto flex items-center justify-between flex-wrap gap-5 px-5 py-3">
        <Link href="/" className="text-2xl font-bold text-green-600">
          SautiZetu
        </Link>
        <nav>
          <ul className="flex items-center gap-5">
            <li>
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Avatar icon={<UserOutlined />} />{" "}
                    {/* Avatar with UserOutlined icon */}
                    <span>{user.username}</span>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
