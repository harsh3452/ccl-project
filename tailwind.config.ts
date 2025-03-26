import { Bluetooth } from "lucide-react";
import type { Config } from "tailwindcss";

const tailwindConfig: Config = {
  darkMode: ["class"], // Enables dark mode using the 'dark' class
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          "1": "#1C1F2E",
          "2": "#161925",
          3: '#252A41',
          4: '#1E2757',
        },
        blue: {
          "1": "#3C47E9",
          "2": "#1D2D50",
        },
        orange: {
          "1": "#FF742E",
        },
        sky: {
          1: '#C9DDFF',
          2: '#ECF0FF',
          3: '#F5FCFF',
        },
        purple: {
          1: '#830EF9',
        },
        yellow: {
          1: '#F9A90E',
        },
        background: "hsl(var(--background, 0, 0%, 10%))", // fallback for background color
        foreground: "hsl(var(--foreground, 0, 0%, 100%))", // fallback for foreground color
        card: {
          DEFAULT: "hsl(var(--card, 210, 20%, 90%))", // fallback for card background
          foreground: "hsl(var(--card-foreground, 0, 0%, 100%))", // fallback for card text
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 210, 20%, 50%))", // fallback for popover background
          foreground: "hsl(var(--popover-foreground, 0, 0%, 100%))", // fallback for popover text
        },
        primary: {
          DEFAULT: "hsl(var(--primary, 210, 100%, 50%))", // fallback for primary color
          foreground: "hsl(var(--primary-foreground, 0, 0%, 100%))", // fallback for primary text
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 0, 0%, 50%))", // fallback for secondary color
          foreground: "hsl(var(--secondary-foreground, 0, 0%, 100%))", // fallback for secondary text
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 0, 0%, 75%))", // fallback for muted color
          foreground: "hsl(var(--muted-foreground, 0, 0%, 100%))", // fallback for muted text
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 180, 100%, 40%))", // fallback for accent color
          foreground: "hsl(var(--accent-foreground, 0, 0%, 100%))", // fallback for accent text
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0, 100%, 50%))", // fallback for destructive color
          foreground: "hsl(var(--destructive-foreground, 0, 0%, 100%))", // fallback for destructive text
        },
        border: "hsl(var(--border, 0, 0%, 85%))", // fallback for border color
        input: "hsl(var(--input, 0, 0%, 90%))", // fallback for input background
        ring: "hsl(var(--ring, 210, 100%, 50%))", // fallback for ring color
        chart: {
          "1": "hsl(var(--chart-1, 0, 100%, 50%))", // fallback for chart color 1
          "2": "hsl(var(--chart-2, 30, 100%, 50%))", // fallback for chart color 2
          "3": "hsl(var(--chart-3, 60, 100%, 50%))", // fallback for chart color 3
          "4": "hsl(var(--chart-4, 90, 100%, 50%))", // fallback for chart color 4
          "5": "hsl(var(--chart-5, 120, 100%, 50%))", // fallback for chart color 5
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        hero: "url('/images/hero-background.png')",
      },
      borderRadius: {
        lg: "var(--radius, 12px)", // fallback for large border radius
        md: "calc(var(--radius, 12px) - 2px)", // fallback for medium border radius
        sm: "calc(var(--radius, 12px) - 4px)", // fallback for small border radius
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Ensure you have installed this plugin
};

export default tailwindConfig;
