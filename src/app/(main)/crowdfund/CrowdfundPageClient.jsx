"use client";

import { useState } from "react";
import { Card, Button, Progress, List, Modal, message } from "antd";
import {
  PlusOutlined,
  UserAddOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import AddCrowdfundForm from "./AddCrowdfundForm";
import AddSignatoryForm from "./AddSignatoryForm";
import ContributeForm from "./ContributeForm";
import WithdrawForm from "./WithdrawForm";

const CrowdfundPageClient = ({ initialCrowdfunds, currentUser }) => {
  const [crowdfunds, setCrowdfunds] = useState(initialCrowdfunds);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCrowdfund, setSelectedCrowdfund] = useState(null);
  const [isSignatoryModalVisible, setIsSignatoryModalVisible] = useState(false);
  const [isContributeModalVisible, setIsContributeModalVisible] =
    useState(false);
  const [isWithdrawModalVisible, setIsWithdrawModalVisible] = useState(false);

  const handleCrowdfundAdded = (newCrowdfund) => {
    setCrowdfunds((prevCrowdfunds) => [newCrowdfund, ...prevCrowdfunds]);
    setShowAddForm(false);
  };

  const handleSignatoryAdded = (updatedCrowdfund) => {
    setCrowdfunds((prevCrowdfunds) =>
      prevCrowdfunds.map((cf) =>
        cf.id === updatedCrowdfund.id ? updatedCrowdfund : cf
      )
    );
    setIsSignatoryModalVisible(false);
  };

  const handleContribution = (updatedCrowdfund) => {
    setCrowdfunds((prevCrowdfunds) =>
      prevCrowdfunds.map((cf) =>
        cf.id === updatedCrowdfund.id ? updatedCrowdfund : cf
      )
    );
    setIsContributeModalVisible(false);
  };

  const handleWithdrawal = (updatedCrowdfund) => {
    setCrowdfunds((prevCrowdfunds) =>
      prevCrowdfunds.map((cf) =>
        cf.id === updatedCrowdfund.id ? updatedCrowdfund : cf
      )
    );
    setIsWithdrawModalVisible(false);
  };

  return (
    <>
      <div className="mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          Create New Crowdfund
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Create New Crowdfund</h2>
          <AddCrowdfundForm onCrowdfundAdded={handleCrowdfundAdded} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {crowdfunds.map((crowdfund) => (
          <Card
            key={crowdfund.id}
            title={crowdfund.title}
            extra={
              <div>
                <Button
                  icon={<UserAddOutlined />}
                  onClick={() => {
                    setSelectedCrowdfund(crowdfund);
                    setIsSignatoryModalVisible(true);
                  }}
                />
                <Button
                  icon={<DollarOutlined />}
                  onClick={() => {
                    setSelectedCrowdfund(crowdfund);
                    setIsContributeModalVisible(true);
                  }}
                />
              </div>
            }
            className="w-full"
          >
            <p>
              <strong>Description:</strong> {crowdfund.description}
            </p>
            <p>
              <strong>Status:</strong> {crowdfund.status}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {format(new Date(crowdfund.createdAt), "dd/MM/yyyy")}
            </p>
            <Progress
              percent={Math.min(
                (crowdfund.currentAmount / crowdfund.targetAmount) * 100,
                100
              )}
              status={
                crowdfund.currentAmount >= crowdfund.targetAmount
                  ? "success"
                  : "active"
              }
              format={() =>
                `$${crowdfund.currentAmount?.toFixed(2) || "0.00"} / $${
                  crowdfund.targetAmount?.toFixed(2) || "0.00"
                }`
              }
            />
            <p>
              <strong>Top 5 Contributors:</strong>
            </p>
            <List
              size="small"
              dataSource={crowdfund.contributions?.slice(0, 5) || []}
              renderItem={(contribution) => (
                <List.Item>
                  {contribution.contributor?.username || "Anonymous"}: $
                  {contribution.amount?.toFixed(2) || "0.00"}
                </List.Item>
              )}
            />
            {crowdfund.creator?.id === currentUser?.id && (
              <Button
                onClick={() => {
                  setSelectedCrowdfund(crowdfund);
                  setIsWithdrawModalVisible(true);
                }}
              >
                Withdraw Funds
              </Button>
            )}
          </Card>
        ))}
      </div>

      <Modal
        title="Add Signatory"
        visible={isSignatoryModalVisible}
        onCancel={() => setIsSignatoryModalVisible(false)}
        footer={null}
      >
        <AddSignatoryForm
          crowdfund={selectedCrowdfund}
          onSignatoryAdded={handleSignatoryAdded}
        />
      </Modal>

      <Modal
        title="Contribute to Fund"
        visible={isContributeModalVisible}
        onCancel={() => setIsContributeModalVisible(false)}
        footer={null}
      >
        <ContributeForm
          crowdfund={selectedCrowdfund}
          onContribution={handleContribution}
        />
      </Modal>

      <Modal
        title="Withdraw Funds"
        visible={isWithdrawModalVisible}
        onCancel={() => setIsWithdrawModalVisible(false)}
        footer={null}
      >
        <WithdrawForm
          crowdfund={selectedCrowdfund}
          onWithdrawal={handleWithdrawal}
        />
      </Modal>
    </>
  );
};

export default CrowdfundPageClient;
