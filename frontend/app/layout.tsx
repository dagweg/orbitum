import type { Metadata } from "next";
import {
  Inter,
  Lato,
  Open_Sans,
  Plus_Jakarta_Sans,
  Work_Sans,
} from "next/font/google";
import localFont from "@next/font/local";
import "./globals.css";
import Navbar from "./components/navbar";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import ReduxProvider from "./components/providers/ReduxProvider";
import { Toaster } from "@/components/ui/toaster";
import SocketProvider from "./components/providers/SocketProvider";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
const lemonMilk = localFont({
  src: [
    {
      path: "../public/fonts/LEMONMILK-Regular.otf",
      weight: "400",
    },
  ],
  variable: "--font-lemonmilk",
});

const jakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

const openSans = Open_Sans({ subsets: ["latin"] });

const lato = Lato({ subsets: ["latin"], weight: "400" });

const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Orbitum",
  description: "Social Media Platform",
  externalScripts: [
    {
      src: "https://kit.fontawesome.com/bb488c4407.js",
      crossOrigin: "anonymous",
      defer: true,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Head>
        <script
          src="https://kit.fontawesome.com/bb488c4407.js"
          crossOrigin="anonymous"
          defer
        ></script>
      </Head> */}
      <ReduxProvider>
        <body
          suppressHydrationWarning
          className={` ${lemonMilk.variable} ${openSans.className} ${lato.className} ${workSans.className} ${inter.className} ${jakartaSans.className}  font-workSans`}
        >
          <main className="h-screen">{children}</main>
          <Toaster />
        </body>
      </ReduxProvider>
    </html>
  );
}
