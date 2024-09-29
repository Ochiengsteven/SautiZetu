import { Suspense } from "react";
import { getAllCrowdfunds } from "./actions";
import CrowdfundPageClient from "./CrowdfundPageClient";
import { validateRequest } from "@/auth";

const CrowdfundPage = async () => {
  const { success, crowdfunds, error } = await getAllCrowdfunds();
  const session = await validateRequest();

  if (!success) {
    return <div>Error: {error}</div>;
  }

  if (!session || !session.user) {
    return <div>Error: User not authenticated</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crowdfunding Campaigns</h1>
      <Suspense fallback={<div>Loading crowdfunds...</div>}>
        <CrowdfundPageClient
          initialCrowdfunds={crowdfunds}
          currentUser={session.user}
        />
      </Suspense>
    </div>
  );
};

export default CrowdfundPage;
