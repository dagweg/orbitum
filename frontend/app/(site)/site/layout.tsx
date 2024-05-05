import Navbar from "@/app/components/navbar";

function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="w-full h-full bg-neutral-300">{children}</div>
    </>
  );
}

export default SiteLayout;
