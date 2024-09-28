import { Suspense } from "react";
import { getAllBills } from "./actions";
import BillsPageClient from "./BillsPageClient";

const BillsPage = async () => {
  const { success, bills, error } = await getAllBills();

  if (!success) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bills</h1>
      <Suspense fallback={<div>Loading bills...</div>}>
        <BillsPageClient initialBills={bills} />
      </Suspense>
    </div>
  );
};

export default BillsPage;
