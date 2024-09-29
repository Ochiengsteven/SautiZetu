"use client";

import { useState } from "react";
import { Button, message } from "antd";
import AddWhistleblowerForm from "./AddWhistleblowerForm";
import WhistleblowerList from "./WhistleblowerList";

const WhistleblowerPageClient = ({ initialReports }) => {
  const [reports, setReports] = useState(initialReports);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleReportAdded = (newReport) => {
    setReports((prevReports) => [newReport, ...prevReports]);
    setShowAddForm(false);
  };

  return (
    <>
      <div className="mb-4">
        <Button type="primary" onClick={() => setShowAddForm(!showAddForm)}>
          Submit New Whistleblower Report
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">New Whistleblower Report</h2>
          <AddWhistleblowerForm onReportAdded={handleReportAdded} />
        </div>
      )}

      <WhistleblowerList reports={reports} />
    </>
  );
};

export default WhistleblowerPageClient;
