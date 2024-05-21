import Navbar from "@/app/components/navbar";
import { isUserLoggedIn } from "@/lib/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_TOKEN } from "../../../../backend/src/apiConfig";
import { store } from "@/lib/redux/store";

async function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="w-full h-full bg-neutral-50">{children}</div>
    </>
  );
}

export default SiteLayout;
