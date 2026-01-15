"use client";

import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component
import { usePathname } from "next/navigation"; // Import usePathname hook
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname(); // Get the current route path

  return (
    <nav className={`flex justify-between items-center p-4 border-b border-green-700 bg-green-800 text-white ${styles.navbar}`}>
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

      {/* Navigation Links */}
      <div className={`space-x-6 ${styles.navLinks}`}>
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
      </div>

      {/* Sign In Button */}
      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-all">
        Sign In
      </button>
    </nav>
  );
}
