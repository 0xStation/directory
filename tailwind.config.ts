const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      favoritpro: ["var(--favoritpro-font)", ...fontFamily.sans],
    },
    extend: {
      viewports: {
        "3xl": "1920px",
      },
      width: {
        0.25: "1px",
      },
      maxHeight: {
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
      },
      maxWidth: {
        content: "1728px",
      },
      fontSize: {
        xxs: ["12px", "18px"],
        xs: ["14px", "21px"],
        sm: ["16px", "24px"],
        "base-xxs": ["12px", { lineHeight: "16px" }],
        "base-xs": ["14px", { lineHeight: "18px" }],
        "base-sm": ["16px", { lineHeight: "20px" }],
        "base-m": ["18px", { lineHeight: "22px" }],
        "heading-xxs": ["13px", { lineHeight: "17px" }],
        "heading-xs": ["14px", { lineHeight: "18px" }],
        "heading-s": ["16px", { lineHeight: "20px" }],
        "heading-m": ["18px", { lineHeight: "22px" }],
        "heading-l": ["22px", { lineHeight: "26px" }],
        "heading-xl": ["24px", { lineHeight: "28px" }],
        "heading-2xl": ["26px", { lineHeight: "30px" }],
        "heading-3xl": ["32px", { lineHeight: "36px" }],
        "sm-medium": [
          "16px",
          {
            fontWeight: "500",
            lineHeight: "24px",
          },
        ],
        "sm-bold": [
          "16px",
          {
            fontWeight: "700",
            lineHeight: "24px",
          },
        ],
        base: ["18px", "27px"],
        "base-medium": [
          "18px",
          {
            fontWeight: "500",
            lineHeight: "27px",
          },
        ],
        "base-bold": [
          "18px",
          {
            fontWeight: "700",
            lineHeight: "27px",
          },
        ],
        xl: ["22px", "33px"],
        "xl-bold": [
          "22px",
          {
            fontWeight: "700",
            lineHeight: "33px",
          },
        ],
        "2xl": [
          "26px",
          {
            fontWeight: "700",
            lineHeight: "39px",
          },
        ],
        "2xl-bold": [
          "26px",
          {
            fontWeight: "700",
            lineHeight: "39px",
          },
        ],
      },
      keyframes: {
        failureFadeInOut: {
          "0%": {
            opacity: 0,
            transform: "scale(0.99,0.99) translateY(2px)",
            backgroundColor: "rgba(255, 86, 80, 0)",
          },
          "25%": {
            opacity: 1,
            transform: "scale(1,1) translateY(0px)",
            backgroundColor: "rgba(255, 86, 80, 0.3)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1,1) translateY(0px)",
            backgroundColor: "rgba(255, 86, 80, 0)",
          },
        },
        successFadeInOut: {
          "0%": {
            opacity: 0,
            transform: "scale(0.99,0.99) translateY(2px)",
            backgroundColor: "rgba(99, 235, 175, 0)",
          },
          "25%": {
            opacity: 1,
            backgroundColor: "rgba(99, 235, 175, 0.3)",
            transform: "scale(1,1) translateY(0px)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1,1) translateY(0px)",
            backgroundColor: "rgba(99, 235, 175, 0)",
          },
        },
        ModalSuccessFadeInOut: {
          "0%": {
            border: "0px solid #AD72FF",
          },
          "10%": {
            border: "1px solid #AD72FF",
          },
          "80%": {
            border: "1px solid #AD72FF",
          },
          "100%": {
            border: "1px solid ##2E2E2E",
          },
        },
      },
      animation: {
        fadeInOut_failure: "failureFadeInOut 1s ease-in forwards",
        fadeInOut_success: "successFadeInOut 1s ease-in forwards",
        modal_success: "ModalSuccessFadeInOut 1s ease-out",
      },
      colors: {
        black: colors.black,
        white: colors.white,
        slate: colors.slate,
        transparent: "transparent",
        current: "currentColor",
        gray: {
          DEFAULT: "#646464",
          30: "#858585", // concrete 50
          40: "#979797", // concrete 115
          50: "#646464", // concrete 100
          80: "#4d4d4d", // wet-concrete 115
          90: "#2E2E2E", // wet-concrete
          100: "#1A1A1A", // wet-concrete 90
        },
        violet: {
          DEFAULT: "#AD72FF",
          20: "#462F64",
          80: "#684499",
          100: "#AD72FF",
        },
        green: {
          DEFAULT: "#50B488",
          100: "#50B488",
          20: "rgba(99, 235, 175, 0.2)",
        },
        blue: {
          DEFAULT: "#5F6FFF",
          100: "#5F6FFF",
          20: "rgba(95, 111, 255, 0.2)",
        },
        orange: {
          DEFAULT: "#FF9956",
          100: "#FF9956",
          20: "rgba(255, 153, 86, 0.2)",
        },
        red: {
          DEFAULT: "#FF5650",
          20: "rgba(255, 86, 80, 0.2)",
          100: "#FF5650",
        },
        yellow: {
          DEFAULT: "#F9C81B",
          100: "#F9C81B",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
