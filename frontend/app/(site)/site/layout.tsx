import Navbar from "@/app/components/navbar";

async function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="w-full h-full bg-neutral-50">{children}</div>
    </>
  );
}

export default SiteLayout;
