"use client";

import Link from "@/app/components/link";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function AuthPage() {
  const router = useRouter();
  router.push("/auth/register");
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <Loader className="animate-spin" />
      Redirecting to Register
    </div>
  );
}

export default AuthPage;
