function NavItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-start gap-3 hover:bg-neutral-100 active:ring-4 ring-neutral-300 px-2 rounded-lg">
      {children}
    </div>
  );
}

export default NavItem;
