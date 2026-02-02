/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx,css}", // For App Router (Next.js 13+)
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // For Pages Router
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // For components
    "./globals.css", // Include global CSS file
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

