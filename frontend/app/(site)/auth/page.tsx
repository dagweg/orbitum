"use client";

import Link from "@/app/components/link";
import LoaderPage from "@/app/components/loader-page";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function AuthPage() {
  const router = useRouter();
  router.push("/auth/register");
  return <LoaderPage />;
}

export default AuthPage;
