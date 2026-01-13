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
            <body>
                <Navbar />
                <main className="min-h-screen p-6">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
