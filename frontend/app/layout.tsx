import type { Metadata } from "next";
import { Inter, Lato, Open_Sans, Work_Sans } from "next/font/google";
import localFont from "@next/font/local";
import "./globals.css";
import Navbar from "./components/navbar";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import ReduxProvider from "./components/providers/ReduxProvider";
import { Toaster } from "@/components/ui/toaster";
import SocketProvider from "./components/providers/SocketProvider";

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

const openSans = Open_Sans({ subsets: ["latin"] });

const lato = Lato({ subsets: ["latin"], weight: "400" });

const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orbitum",
  description: "Social Media Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body
          suppressHydrationWarning
          className={` ${lemonMilk.variable} ${openSans.className} ${lato.className} ${workSans.className} ${inter.className}  `}
        >
          <main className="h-screen">{children}</main>
          <Toaster />
        </body>
      </ReduxProvider>
    </html>
  );
}
