"use client";

import { Table } from "antd";

const BillsList = ({ bills }) => {
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
      title: "Proposed Date",
      dataIndex: "proposedDate",
      key: "proposedDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <Table
      dataSource={bills}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
};

export default BillsList;
