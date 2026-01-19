"use client";

import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component
import { usePathname } from "next/navigation"; // Import usePathname hook
import { useState } from "react"; // Import useState for managing menu state
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname(); // Get the current route path
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility

  const handleCloseMenu = () => {
    setIsMenuOpen(false); // Close the dropdown
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full flex justify-between items-center p-4 border-b border-green-700 bg-green-800 text-white z-50 ${styles.navbar}`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="CarTrader Logo"
            width={240}
            height={50}
            className={styles.logo}
          />
        </div>

        {/* Burger/Cross Menu Icon */}
        <button
          className="lg:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu visibility
        >
          {isMenuOpen ? "✕" : "☰"} {/* Change icon based on menu state */}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            href="/"
            className={`text-green-400 hover:text-green-300 transition-all ${
              pathname === "/" ? "text-white font-bold" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/pages/new-cars"
            className={`text-green-400 hover:text-green-300 transition-all ${
              pathname === "/pages/new-cars" ? "text-white font-bold" : ""
            }`}
          >
            New Cars
          </Link>
          <Link
            href="/pages/used-cars"
            className={`text-green-400 hover:text-green-300 transition-all ${
              pathname === "/pages/used-cars" ? "text-white font-bold" : ""
            }`}
          >
            Used Cars
          </Link>
          <Link
            href="/pages/sell-car"
            className={`text-green-400 hover:text-green-300 transition-all ${
              pathname === "/pages/sell-car" ? "text-white font-bold" : ""
            }`}
          >
            Sell Car
          </Link>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-all">
            Sign In
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-full bg-green-800 text-white transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 lg:hidden z-40`}
        style={{
          boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.2)", // Add recessed shadow
        }}
      >
        <div className="flex flex-col items-center space-y-4 p-6">
          {/* Sign In Button */}
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-all w-full"
            onClick={handleCloseMenu} // Close dropdown on click
          >
            Sign In
          </button>

          {/* Navigation Links */}
          <Link
            href="/"
            className={`text-green-400 hover:text-green-300 transition-all ${
              pathname === "/" ? "text-white font-bold" : ""
            }`}
            onClick={handleCloseMenu} // Close dropdown on click
          >
            Home
          </Link>
          <Link
            href="/pages/new-cars"
            className={`text-green-400 hover:text-green-300 transition-all ${
              pathname === "/pages/new-cars" ? "text-white font-bold" : ""
            }`}
            onClick={handleCloseMenu} // Close dropdown on click
          >
            New Cars
          </Link>
          <Link
            href="/pages/used-cars"
            className={`text-green-400 hover:text-green-300 transition-all ${
              pathname === "/pages/used-cars" ? "text-white font-bold" : ""
            }`}
            onClick={handleCloseMenu} // Close dropdown on click
          >
            Used Cars
          </Link>
          <Link
            href="/pages/sell-car"
            className={`text-green-400 hover:text-green-300 transition-all ${
              pathname === "/pages/sell-car" ? "text-white font-bold" : ""
            }`}
            onClick={handleCloseMenu} // Close dropdown on click
          >
            Sell Car
          </Link>
        </div>
      </div>
    </>
  );
}
