import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar";
import SideNav from "./SideNav";

export default async function Layout({ children }) {
  const session = await validateRequest();

  if (!session.user) {
    const headersList = headers();
    const pathname = headersList.get("x-invoke-path") || "/";

    // Check if the current path is not '/home' before redirecting
    if (pathname !== "/home") {
      redirect("/home");
    }
  }

  return (
    <SessionProvider value={session}>
      <div className="flex">
        <SideNav />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow max-w-screen">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
