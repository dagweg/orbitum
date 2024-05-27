import LeftBar from "@/app/components/left-bar";
import Navbar from "@/app/components/navbar";

async function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full bg-white sticky top-0 ">
        <Navbar />
      </div>
      <div className="w-full min-h-full     py-4">{children}</div>
    </>
  );
}

export default SiteLayout;
