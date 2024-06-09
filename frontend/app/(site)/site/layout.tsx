import LeftBar from "@/app/components/left-bar";
import Navbar from "@/app/components/navbar";
import SocketProvider from "@/app/components/providers/SocketProvider";

async function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SocketProvider>
        <div className="w-full bg-white sticky top-0 ">
          <Navbar />
        </div>
        <div className="w-full h-screen py-4">{children}</div>
      </SocketProvider>
    </>
  );
}

export default SiteLayout;
