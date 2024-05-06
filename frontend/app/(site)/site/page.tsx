"use client";

import LoaderPage from "@/app/components/loader-page";
import { useRouter } from "next/navigation";

function SitePage() {
  const router = useRouter();
  router.push("/site/feed");
  return <LoaderPage className="bg-white" />;
}

export default SitePage;
