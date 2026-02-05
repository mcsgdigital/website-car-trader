"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const basePath = "/website-car-trader";

  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false); // State to toggle the Sign In panel
  const [panelState, setPanelState] = useState("signIn"); // Tracks the current panel state
  const [email, setEmail] = useState(""); // Tracks the entered email
  const [password, setPassword] = useState(""); // Tracks the entered password
  const [errorMessage, setErrorMessage] = useState(""); // Tracks the error message
  const [isSignedIn, setIsSignedIn] = useState(false); // Default to false
  const [staySignedIn, setStaySignedIn] = useState(false); // Default to false
  const [isMounted, setIsMounted] = useState(false); // Tracks if the component has mounted

  useEffect(() => {
    // Set the mounted state to true after the component has mounted
    // setIsMounted(true);

    // Check if the user is signed in when the component mounts
    const storedSignedIn = localStorage.getItem("staySignedIn");
    if (storedSignedIn === "true") {
      // setIsSignedIn(true);
      // setStaySignedIn(true);
    }
  }, []);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleCloseSignIn = () => {
    setIsSignInOpen(false); // Close the Sign In panel
    setPanelState("signIn"); // Reset panel state
    setEmail(""); // Clear email
    setPassword(""); // Clear password
    setErrorMessage(""); // Clear error message
  };

  const handleContinue = () => {
    // Validate the email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email:", email);
      
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Clear any previous error messages
    setErrorMessage("");

    if (panelState === "signIn") {
      // Check if the email exists in localStorage
      const storedPassword = localStorage.getItem(email);
      if (storedPassword) {
        // Email exists, show "Enter password" panel
        setPanelState("enterPassword");
      } else {
        // Email does not exist, show "Create account" panel
        setPanelState("createAccount");
      }
    } else if (panelState === "enterPassword") {
      handleSignIn();
    } else if (panelState === "createAccount") {
      handleCreateAccount();
    }
  };

  const handleSignIn = () => {
    // Check if the entered password matches the stored password
    const storedPassword = localStorage.getItem(email);
    if (storedPassword === password) {
      setIsSignedIn(true); // Mark the user as signed in
      if (staySignedIn) {
        localStorage.setItem("staySignedIn", "true"); // Save "stay signed in" preference
      } else {
        localStorage.removeItem("staySignedIn"); // Remove "stay signed in" preference
      }
      handleCloseSignIn(); // Close the Sign In panel
    } else {
      setErrorMessage("Incorrect password. Please try again.");
    }
  };

  const handleCreateAccount = () => {
    // Validate the password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    // Store the email and password in localStorage
    localStorage.setItem(email, password);
    setErrorMessage(""); // Clear error message
    alert("Account created successfully!");
    handleCloseSignIn(); // Close the Sign In panel
  };

  const handleLogOut = () => {
    setIsSignedIn(false); // Mark the user as signed out
    localStorage.removeItem("staySignedIn"); // Remove "stay signed in" preference
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
            src={`${basePath}/logo.png`}
            alt="CarTrader Logo"
            width={240}
            height={50}
            className={styles.logo}
            loading="eager"
          />
        </div>

        {/* Burger/Cross Menu Icon */}
        <button
          className="lg:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
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
          {/* Defer rendering until the component has mounted */}
          {isMounted && (
            <>
              {isSignedIn ? (
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-all"
                  onClick={handleLogOut} // Log out the user
                >
                  Log Out
                </button>
              ) : (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-all"
                  onClick={() => setIsSignInOpen(true)} // Open the Sign In panel
                >
                  Sign In
                </button>
              )}
            </>
          )}
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-full bg-green-800 text-white transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 lg:hidden z-40`}
        style={{
          boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="flex flex-col items-center space-y-4 p-6">
          {isSignedIn ? (
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-all w-full"
              onClick={() => {
                handleLogOut(); // Log out the user
                handleCloseMenu(); // Close the mobile menu
              }}
            >
              Log Out
            </button>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-all w-full"
              onClick={() => {
                handleCloseMenu(); // Close the mobile menu
                setIsSignInOpen(true); // Open the Sign In panel
              }}
            >
              Sign In
            </button>
          )}
          <Link
            href="/"
            className={`text-green-400 hover:text-green-300 transition-all ${
              pathname === "/" ? "text-white font-bold" : ""
            }`}
            onClick={handleCloseMenu}
          >
            Home
          </Link>
          <Link
            href="/pages/new-cars"
            className={`text-green-400 hover:text-green-300 transition-all ${
              pathname === "/pages/new-cars" ? "text-white font-bold" : ""
            }`}
            onClick={handleCloseMenu}
          >
            New Cars
          </Link>
          <Link
            href="/pages/used-cars"
            className={`text-green-400 hover:text-green-300 transition-all ${
              pathname === "/pages/used-cars" ? "text-white font-bold" : ""
            }`}
            onClick={handleCloseMenu}
          >
            Used Cars
          </Link>
          <Link
            href="/pages/sell-car"
            className={`text-green-400 hover:text-green-300 transition-all ${
              pathname === "/pages/sell-car" ? "text-white font-bold" : ""
            }`}
            onClick={handleCloseMenu}
          >
            Sell Car
          </Link>
        </div>
      </div>

      {/* Sign In Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-gray-300 shadow-lg transform ${
          isSignInOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50 dark:bg-white`}
      >
        <div className="p-6 relative">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl focus:outline-none"
            onClick={handleCloseSignIn} // Close the Sign In panel
          >
            ✕
          </button>

          {panelState === "signIn" && (
            <>
              <h2 className="text-2xl font-bold mb-4 mt-16 dark:text-black">
                Sign in or create an account
              </h2>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-800 rounded mb-4 dark:text-gray-500 boder-gray-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorMessage && (
                <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
              )}
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
                onClick={handleContinue} // Check email and update panel state
              >
                Continue
              </button>
            </>
          )}

          {panelState === "enterPassword" && (
            <>
              <h2 className="text-2xl font-bold mb-4 mt-16 dark:text-black">
                Enter password
              </h2>
              <p className="text-sm text-gray-700 mb-4">{email}</p>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-800 rounded mb-4 dark:text-gray-500 boder-gray-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && (
                <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
              )}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="staySignedIn"
                  className="mr-2"
                  checked={staySignedIn}
                  onChange={(e) => setStaySignedIn(e.target.checked)} // Update state
                />
                <label htmlFor="staySignedIn" className="text-sm text-gray-700">
                  Stay signed in
                </label>
              </div>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
                onClick={handleContinue} // Validate password and sign in
              >
                Continue
              </button>
            </>
          )}

          {panelState === "createAccount" && (
            <>
              <h2 className="text-2xl font-bold mb-4 mt-16 dark:text-black">
                Create account
              </h2>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-800 rounded mb-4 dark:text-gray-500 boder-gray-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-800 rounded mb-4 dark:text-gray-500 boder-gray-300"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && (
                <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
              )}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="staySignedIn"
                  className="mr-2"
                />
                <label htmlFor="staySignedIn" className="text-sm text-gray-700">
                  Stay signed in
                </label>
              </div>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
                onClick={handleContinue} // Validate and create account
              >
                Create account
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
