
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Målarnas.se - Jämför målarfirmor",
  description: "Hitta certifierade och lokala målare. Få offerter inom 24 timmar.",
};

import { QuoteModalProvider } from "@/components/providers/QuoteModalProvider";

// ... existing imports

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased text-gray-900 bg-white flex flex-col min-h-screen`}>
        <QuoteModalProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
