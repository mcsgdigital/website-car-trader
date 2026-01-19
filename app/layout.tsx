import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
    title: "CarTrader",
    description: "Buy and sell cars easily",
};

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                {/* Font Awesome */}
                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                    rel="stylesheet"
                />
            </head>
            <body>
                <Navbar />
                {/* Add padding to the top of the main content to account for the navbar height */}
                <main className="min-h-screen p-6 pt-30 lg:pt-30">
                    {children}
                </main>
                <footer className="bg-gray-800 text-white py-8">
                    <div className="max-w-[1152px] mx-auto px-4">
                        <Footer />
                    </div>
                </footer>
            </body>
        </html>
    );
}
