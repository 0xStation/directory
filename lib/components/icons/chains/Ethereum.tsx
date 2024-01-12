import { cn } from "@/lib/utils"

export const Ethereum = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden="true"
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(`bg-[#25292E] rounded-full ${className}`)}
    >
      <path
        d="M21.9967 6.99621L21.7955 7.67987V27.5163L21.9967 27.7171L31.2044 22.2744L21.9967 6.99621Z"
        fill="var(--ck-chain-ethereum-02, #ffffff)"
      ></path>
      <path
        d="M21.9957 6.99621L12.7878 22.2744L21.9957 27.7171V18.0891V6.99621Z"
        fill="var(--ck-chain-ethereum-02, #ffffff)"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.9959 36.9996L21.9959 36.9997V36.9995L31.2091 24.0243L21.9959 29.4642L12.788 24.0243L21.9957 36.9993L21.9958 36.9997L21.9959 36.9996Z"
        fill="var(--ck-chain-ethereum-02, #ffffff)"
      ></path>
      <path
        d="M21.996 27.7181L31.2037 22.2753L21.996 18.09V27.7181Z"
        fill="var(--ck-chain-ethereum-02, #ffffff)"
      ></path>
      <path
        d="M12.7878 22.2753L21.9957 27.7181V18.09L12.7878 22.2753Z"
        fill="var(--ck-chain-ethereum-02, #ffffff)"
      ></path>
    </svg>
  )
}
