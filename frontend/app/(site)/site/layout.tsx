import Navbar from "@/app/components/navbar";

async function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className=" z-10  backdrop-blur-lg sticky top-0">
        <Navbar />
      </div>
      <div className="w-full min-h-full h-fit  bg-neutral-50  py-4">
        {children}
      </div>
    </>
  );
}

export default SiteLayout;
