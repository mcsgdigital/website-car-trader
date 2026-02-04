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
  safelist: [
    // Add any classes you want to ensure are included in the build
    "min-h-screen",
    "p-6",
    "pt-30",
    "lg:pt-30",
    "bg-gray-800",
    "text-white",
    "py-8",
    "max-w-[1152px]",
    "mx-auto",
    "px-4"
  ],
}

