import { cn } from "@/lib/utils";
import Link from "next/link";

const TextLink = ({
  className,
  href,
  children,
}: {
  href: string;
  children: any;
  className?: string;
}) => {
  return (
    <Link
      className={cn("text-action hover:underline", className)}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </Link>
  );
};

export default TextLink;
