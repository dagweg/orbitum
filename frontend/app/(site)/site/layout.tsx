import Navbar from "@/app/components/navbar";
import { isUserLoggedIn } from "@/lib/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_TOKEN } from "../../../../backend/src/apiConfig";

async function SiteLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const authToken = cookieStore.get(AUTH_TOKEN)?.value;
  const loggedIn = await isUserLoggedIn(authToken ?? "");

  if (!loggedIn) {
    redirect("/auth/login");
  }
  return (
    <>
      <Navbar />
      <div className="w-full h-full bg-neutral-50">{children}</div>
    </>
  );
}

export default SiteLayout;
