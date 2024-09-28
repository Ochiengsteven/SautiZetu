"use client";

import { useState } from "react";
import { Card, Button, Modal, message } from "antd";
import { CommentOutlined, PlusOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import AddBillForm from "./AddBillForm";
import { createForumPost } from "./actions";

const BillsPageClient = ({ initialBills }) => {
  const [bills, setBills] = useState(initialBills);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleBillAdded = (newBill) => {
    setBills((prevBills) => [newBill, ...prevBills]);
    setShowAddForm(false);
  };

  const handleForumClick = (bill) => {
    setSelectedBill(bill);
    setIsModalVisible(true);
  };

  const handleCreateForum = async () => {
    if (selectedBill) {
      const result = await createForumPost({
        title: `Discussion: ${selectedBill.title}`,
        content: `This is a forum to discuss the bill: ${selectedBill.title}`,
        billId: selectedBill.id,
      });

      if (result.success) {
        message.success("Forum created successfully");
        setIsModalVisible(false);
      } else {
        message.error(result.error);
      }
    }
  };

  return (
    <>
      <div className="mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          Add Proposed Bill
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Bill</h2>
          <AddBillForm onBillAdded={handleBillAdded} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bills.map((bill) => (
          <Card
            key={bill.id}
            title={bill.title}
            extra={
              <Button
                icon={<CommentOutlined />}
                onClick={() => handleForumClick(bill)}
              />
            }
            className="w-full"
          >
            <p>
              <strong>Description:</strong> {bill.description}
            </p>
            <p>
              <strong>Status:</strong> {bill.status}
            </p>
            <p>
              <strong>Proposed By:</strong> {bill.proposedBy}
            </p>
            <p>
              <strong>Proposed Date:</strong>{" "}
              {format(new Date(bill.proposedDate), "dd/MM/yyyy")}
            </p>
          </Card>
        ))}
      </div>

      <Modal
        title="Create Forum"
        visible={isModalVisible}
        onOk={handleCreateForum}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Do you want to create a forum for discussing this bill?</p>
      </Modal>
    </>
  );
};

export default BillsPageClient;
