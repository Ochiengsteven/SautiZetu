"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Layout, Menu } from "antd";
import {
  FileTextOutlined,
  TeamOutlined,
  CommentOutlined,
  WarningOutlined,
  AlertOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { key: "/", icon: <HomeOutlined />, label: "Home" },
    { key: "/bills", icon: <FileTextOutlined />, label: "Bills" },
    { key: "/crowdfund", icon: <TeamOutlined />, label: "Crowdfund" },
    { key: "/forums", icon: <CommentOutlined />, label: "Forums" },
    {
      key: "/policebrutalityreport",
      icon: <WarningOutlined />,
      label: "Police Brutality Report",
    },
    { key: "/whistleblower", icon: <AlertOutlined />, label: "Whistleblower" },
  ];

  // Function to handle window resize
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="min-h-screen bg-white"
    >
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[pathname]}
        className="border-r border-gray-200 mt-14"
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link href={item.key}>
              <span>{item.label}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideNav;
