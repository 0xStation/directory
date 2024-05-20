import Link from "next/link";

export function BoxLink({ href, children }: { href: string; children: any }) {
  return (
    <Link
      className="px-2 py-1 rounded border border-highlight hover:bg-white/10 flex flex-row items-center space-x-2 w-fit"
      href={href}
      target="_blank"
    >
      {children}
    </Link>
  );
}
