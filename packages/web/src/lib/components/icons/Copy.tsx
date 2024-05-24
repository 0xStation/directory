import { Copy as CopyIcon } from "lucide-react";
import { Check } from "lucide-react";
import { useState } from "react";

export function Copy({
  value,
  className,
}: {
  value?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  return copied ? (
    <Check className={className} />
  ) : (
    <CopyIcon
      className={className}
      onClick={() => {
        navigator.clipboard
          .writeText(value ?? "")
          .then(() => {
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000); // Reset the copied state after 2 seconds
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
          });
      }}
    />
  );
}
