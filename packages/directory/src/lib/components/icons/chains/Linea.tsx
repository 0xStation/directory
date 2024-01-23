import { cn } from "@/lib/utils";

export const Linea = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden="true"
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        `bg-[#black] rounded-full border border-gray-50 ${className}`
      )}
    >
      <g transform="matrix(1,0,0,1,-2.5,-3.5)">
        <g transform="matrix(0.534127,0,0,0.547555,13.8389,9.20295)">
          <path
            d="M39.795,50.663L0.125,50.663L0.125,8.864L9.202,8.864L9.202,42.562L39.795,42.562L39.795,50.663Z"
            fill="white"
          />
        </g>
        <g transform="matrix(0.520037,0,0,0.502137,14.3995,9.60554)">
          <path
            d="M39.795,16.96C44.267,16.96 47.891,13.336 47.891,8.864C47.891,4.393 44.267,0.768 39.795,0.768C35.324,0.768 31.699,4.393 31.699,8.864C31.699,13.336 35.324,16.96 39.795,16.96Z"
            fill="white"
          />
        </g>
      </g>
    </svg>
  );
};
