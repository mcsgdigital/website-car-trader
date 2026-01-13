import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component
import styles from "./Navbar.module.css";

export default function Navbar() {
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
        <Link href="/" className="hover:text-green-300 transition-all">
          Home
        </Link>
        <Link href="../pages/new-cars" className="hover:text-green-300 transition-all">
          New Cars
        </Link>
        <Link href="../pages/used-cars" className="hover:text-green-300 transition-all">
          Used Cars
        </Link>
        <Link href="../pages/sell-car" className="hover:text-green-300 transition-all">
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
