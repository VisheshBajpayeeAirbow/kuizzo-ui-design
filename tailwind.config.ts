import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    screens: {
      tablet: "768px",
      md: "1366px",
      lg: "1600px",
    },
    extend: {
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "fade-out": "fadeOut 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },

      colors: {
        "pure-white": "#FFFFFF",
        "app-green": "#00C685",
        "app-purple": "#7F56D9",
        "app-orange": "#FF6905",
        "app-blue": "#4883FF",
        "app-white": "#F2EFFF",
        "orange-shade-left": "#FF6905",
        "orange-shade-right": "#993F03",
        "rating-star-color": "#FAB437",
        // browse by exams icon backgrounds
        "browse-by-exams-icon-background-1": "#E9E5FF",
        "browse-by-exams-icon-background-2": "#FFE8D9",
        "browse-by-exams-icon-background-3": "#CFDFFF",

        "input-text": "#9E9ABC",
        "input-icon": "#AFA4F0",
        "input-border": "#625A92",

        background: "var(--background)",
        "background-app": "var(--background-app)",
        "card-background": "var(--card-background)",
        "top-flashcards-card-background":
          "var(--top-flashcards-card-background)",
        "badge-background": "var(--badge-background)",
        "badge-text": "var(--badge-text)",
        "navbar-text": "var(--navbar-text)",
        "rating-count": "var(--rating-count)",
        heading: "var(--heading)",
        "sub-heading": "var(--sub-heading)",
        "input-background": "var(--input-background)",
        "input-label": "var(--input-label)",

        "background-shade": "var(--background-shade)",
        "footer-background": "var(--footer-background)",
        "card-border": "var(--card-border)",
        "hero-border": "var(--hero-border)",
        "card-seperator": "var(--card-seperator)",
        "card-icon-background": "var(--card-icon-background)",
        "institution-hero-badge": "var(--institution-hero-badge)",
        "institution-hero-badge-icon": "var(--institution-hero-badge-icon)",
        "dashboard-sidebar-border": "var(--dashboard-sidebar-border)",
        "dashboard-card-background": "var(--dashboard-card-background)",
        "dashboard-input-background": "var(--dashboard-input-background)",
      },
      borderRadius: {
        "button-border-radius": "40px",
        "card-border-radius": "1.875rem",
        "badge-radius": "5px",
      },
      padding: {
        "button-padding": "28px 66px",
        "button-icon-padding": "22px 30px",
      },
      fontSize: {
        "font-button-size": "22px",
      },
      fontFamily: {
        caladea: ["Caladea", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        dmSans: ["DM Sans", "sans-serif"],
      },

      height: {
        "card-height": "270px",
      },
      boxShadow: {
        cardShadow: "0px 0px 20px 0px",
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/forms")],
};

export default config;
