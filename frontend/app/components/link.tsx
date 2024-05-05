import { default as Lnk } from "next/link";

type TLink = { children: React.ReactNode; href: string; target?: string };

function Link({ children, href, target }: TLink) {
  return (
    <Lnk
      href={href}
      target={target}
      className="hover:underline text-indigo-500 font-semibold"
    >
      {children}
    </Lnk>
  );
}

export default Link;
