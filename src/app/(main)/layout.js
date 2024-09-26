import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar";

export default async function Layout({ children }) {
  const session = await validateRequest();

  if (!session.user) {
    // Check if the current path is not '/home' before redirecting
    if (typeof window !== "undefined" && window.location.pathname !== "/home") {
      redirect("/home");
    }
  }

  return (
    <SessionProvider value={session}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow max-w-screen">{children}</main>
      </div>
    </SessionProvider>
  );
}
