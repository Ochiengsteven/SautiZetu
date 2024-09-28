import { Suspense } from "react";
import { getAllForums } from "./actions";
import ForumsPageClient from "./ForumsPageClient";

const ForumsPage = async () => {
  const { success, forums, error } = await getAllForums();

  if (!success) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Forums</h1>
      <Suspense fallback={<div>Loading forums...</div>}>
        <ForumsPageClient initialForums={forums} />
      </Suspense>
    </div>
  );
};

export default ForumsPage;
