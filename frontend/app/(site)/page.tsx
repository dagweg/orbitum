"use client";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoaderPage from "../components/loader-page";

export default function Home() {
  const router = useRouter();
  router.push("/auth/register");
  return <LoaderPage />;
}
