import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={`flex justify-between items-center p-4 border-b border-b-zinc-500 bg-transparent ${styles.navbar}`}>
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="CarTrader Logo"
          width={240} 
          height={50} 
          className={styles.logo}
        />
      </div>
      <div className={`space-x-4 ${styles.navLinks}`}>
        <Link href="/">Home</Link>
        <Link href="../pages/new-cars">New Cars</Link>
        <Link href="../pages/used-cars">Used Cars</Link>
        <Link href="../pages/sell-car">Sell Car</Link>
      </div>
      <button className={styles.signInButton}>Sign In</button>
    </nav>
  );
}
