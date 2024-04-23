import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

//temporary button setup
const buttonVariants = cva(
  "flex flex-shrink items-center justify-center rounded-md text-center border outline-none font-bold transition-all duration-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none whitespace-nowrap text-ellipsis overflow-hidden",
  {
    variants: {
      variant: {
        primary: "border-action bg-action hover:opacity-80 !text-black",
        secondary:
          "border-action bg-transparent hover:bg-highlight !text-action",
        unemphasized:
          "border-primary bg-transparent hover:bg-highlight !text-primary",
        input:
          "border-highlightFaint bg-highlightFaint hover:opacity-80 !text-white",
        error: "border-red bg-transparent hover:bg-highlight !text-red",
        danger: "border-red bg-red hover:opacity-80 !text-white",
      },
      size: {
        sm: "px-4 text-xs max-h-7 h-7",
        md: "px-5 text-base max-h-9 h-9",
        lg: "px-6 text-base max-h-11 h-11",
      },
      fullWidth: {
        true: "w-full",
      },
    },
  }
);

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> &
    VariantProps<typeof buttonVariants> & {
      children: React.ReactNode;
      loading?: boolean;
    }
>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading,
      ...props
    },
    ref
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useImperativeHandle(
      ref,
      () => buttonRef.current as HTMLButtonElement
    );

    return (
      <button
        ref={buttonRef}
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          loading && "cursor-wait",
          className
        )}
        {...props}
      >
        {loading ? (
          <Spinner variant={variant} size={size} />
        ) : typeof children === "string" ? (
          <div className="whitespace-nowrap text-ellipsis overflow-hidden">
            {children}
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

const spinnerVariants = cva("animate-spin", {
  variants: {
    variant: {
      primary: "text-black",
      secondary: "text-action",
      input: "text-white",
      unemphasized: "text-white",
      error: "text-red",
      danger: "text-white",
    },
    size: {
      sm: "w-5 h-5",
      md: "w-6 h-6",
      lg: "w-8 h-8",
    },
  },
});

export const Spinner = ({
  variant = "primary",
  size = "md",
}: VariantProps<typeof spinnerVariants>) => (
  // this is custom made from this sample CodePen: https://codepen.io/mtvv/pen/JjdoPRr
  // and this tutorial: https://www.benmvp.com/blog/how-to-create-circle-svg-gradient-loading-spinner/
  // it works by making two semi-circle arcs and applying 0->50 gradient on one and 50-100 gradient
  // on the other to make it look like one continuous 0->100 gradient
  <svg
    className={cn(
      "animate-spin",
      spinnerVariants({
        variant,
        size,
      })
    )}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    color="#687385"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="spinner-firstHalf">
        <stop offset="0%" stopOpacity="1" stopColor="currentColor" />
        <stop offset="100%" stopOpacity="0.4" stopColor="currentColor" />
      </linearGradient>
      <linearGradient id="spinner-secondHalf">
        <stop offset="0%" stopOpacity="0" stopColor="currentColor" />
        <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
      </linearGradient>
    </defs>

    <g fill="currentColor" transform="translate(4,4)">
      <path
        fill="url(#spinner-firstHalf)"
        d="M 0 8 A 8 8 0 0 0 16 8 L 13 8 A 5 5 0 0 1 3 8 L 0 8 Z"
      />
      <path
        fill="url(#spinner-secondHalf)"
        d="M 16 8 A 8 8 0 0 0 0 8 L 3 8 A 5 5 0 0 1 13 8 L 16 8 Z"
      />
    </g>
  </svg>
);
