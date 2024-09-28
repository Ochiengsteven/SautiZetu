import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProfileContent from "./ProfileContent";

const getUser = async (id) => {
  const user = await prisma.user.findFirst({
    where: { id: id },
  });

  if (!user) notFound();

  return user;
};

const Profile = async ({ params: { id } }) => {
  const user = await getUser(id);

  return <ProfileContent initialUser={user} />;
};

export default Profile;
