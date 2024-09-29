import { Suspense } from "react";
import { getAllWhistleblowerReports } from "./actions";
import WhistleblowerPageClient from "./WhistleblowerPageClient";

const WhistleblowerPage = async () => {
  const { success, reports, error } = await getAllWhistleblowerReports();

  if (!success) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Whistleblower Reports</h1>
      <Suspense fallback={<div>Loading reports...</div>}>
        <WhistleblowerPageClient initialReports={reports} />
      </Suspense>
    </div>
  );
};

export default WhistleblowerPage;
