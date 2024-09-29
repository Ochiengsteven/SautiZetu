"use client";

import { Table } from "antd";

const WhistleblowerList = ({ reports }) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Reported By",
      dataIndex: ["reporter", "name"],
      key: "reporter",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(), // {format(new Date(report.date), "dd/MM/yyyy")}
    },
  ];

  return (
    <Table
      dataSource={reports}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
};

export default WhistleblowerList;
