import { Suspense } from "react";
import { getAllPoliceBrutalityReports } from "./actions";
import PoliceBrutalityPageClient from "./PoliceBrutalityPageClient";

const PoliceBrutalityPage = async () => {
  const { success, reports, error } = await getAllPoliceBrutalityReports();

  if (!success) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Police Brutality Reports</h1>
      <Suspense fallback={<div>Loading reports...</div>}>
        <PoliceBrutalityPageClient initialReports={reports} />
      </Suspense>
    </div>
  );
};

export default PoliceBrutalityPage;
