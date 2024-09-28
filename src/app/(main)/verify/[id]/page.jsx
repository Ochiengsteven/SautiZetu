import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

const getUser = async (id) => {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  if (!user) notFound();

  return user;
};

const Verification = async ({ params: { id } }) => {
  const user = await getUser(id);

  return (
    <div>
      <h1>User Verification</h1>
      <h2>{user.username}</h2>
      {/* Render other user details here */}
    </div>
  );
};

export default Verification;
