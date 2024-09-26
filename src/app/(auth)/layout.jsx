import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const session = await validateRequest();

  if (!session.user) {
    // Check if the current path is not '/home' before redirecting
    if (typeof window !== "undefined" && window.location.pathname !== "/home") {
      redirect("/home");
    }
  }

  return <>{children}</>;
}
