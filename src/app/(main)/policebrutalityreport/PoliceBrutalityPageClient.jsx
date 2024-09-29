"use client";

import { useState } from "react";
import { Button, message } from "antd";
import AddPoliceBrutalityForm from "./AddPoliceBrutalityForm";
import PoliceBrutalityList from "./PoliceBrutalityList";

const PoliceBrutalityPageClient = ({ initialReports }) => {
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
          {showAddForm ? "Cancel" : "Submit New Police Brutality Report"}
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">
            New Police Brutality Report
          </h2>
          <AddPoliceBrutalityForm onReportAdded={handleReportAdded} />
        </div>
      )}

      <PoliceBrutalityList reports={reports} />
    </>
  );
};

export default PoliceBrutalityPageClient;
