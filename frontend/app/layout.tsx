import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import ReduxProvider from "./components/providers/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen w-screen`}>
        <ReduxProvider>
          <main className="h-full w-full">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
