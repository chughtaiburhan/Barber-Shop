import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        carmine: {
          50: '#fdf2f2',
          100: '#fde6e6',
          200: '#fbd0d0',
          300: '#f8a9a9',
          400: '#f27676',
          500: '#e94848',
          600: '#d62525',
          700: '#b31919',
          800: '#941818',
          900: '#7a1919',
          950: '#430808',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
};
export default config;
