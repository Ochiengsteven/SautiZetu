"use client";
import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  CommentOutlined,
  FundOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", users: 4000, reports: 2400, amt: 2400 },
  { name: "Feb", users: 3000, reports: 1398, amt: 2210 },
  { name: "Mar", users: 2000, reports: 9800, amt: 2290 },
  { name: "Apr", users: 2780, reports: 3908, amt: 2000 },
  { name: "May", users: 1890, reports: 4800, amt: 2181 },
  { name: "Jun", users: 2390, reports: 3800, amt: 2500 },
  { name: "Jul", users: 3490, reports: 4300, amt: 2100 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          SautiZetu Dashboard
        </h1>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card className="bg-[#fef2d6] text-white font-semibold">
              <Statistic
                title="Active Users"
                value={11280}
                prefix={
                  <UserOutlined
                    style={{
                      backgroundColor: "#ff7e69",
                      padding: "5px",
                      borderRadius: "50%",
                      color: "white",
                    }}
                  />
                }
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="bg-[#d5fce3] font-semibold">
              <Statistic
                title="Reports Filed"
                value={9318}
                prefix={
                  <FileTextOutlined
                    style={{
                      backgroundColor: "#39d83d",
                      padding: "5px",
                      borderRadius: "50%",
                      color: "white",
                    }}
                  />
                }
                valueStyle={{ color: "#cf1322" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="bg-[#f0e0ff] font-semibold">
              <Statistic
                title="Ongoing Discussions"
                value={1628}
                prefix={
                  <CommentOutlined
                    style={{
                      backgroundColor: "#b36efb",
                      padding: "5px",
                      borderRadius: "50%",
                      color: "white",
                    }}
                  />
                }
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="font-semibold bg-[#fcdade]">
              <Statistic
                title="Funds Raised"
                value={2938456}
                prefix={
                  <FundOutlined
                    style={{
                      backgroundColor: "#c17fff",
                      padding: "5px",
                      borderRadius: "50%",
                      color: "white",
                    }}
                  />
                }
                valueStyle={{ color: "#faad14" }}
                suffix="KSh"
              />
            </Card>
          </Col>
        </Row>

        <Card className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            User Activity and Reports Over Time
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="reports" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
