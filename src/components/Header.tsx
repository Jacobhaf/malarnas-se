"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useQuoteModal } from './providers/QuoteModalProvider';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const { openModal } = useQuoteModal();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.svg"
                        alt="Målarnas.se Logo"
                        width={140}
                        height={40}
                        priority
                        className="h-10 w-auto"
                    />
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">START</Link>

                    <Link href="/malerifirma" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                        HITTA MÅLARE
                    </Link>

                    <Link href="/#counties" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">OM OSS</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <button
                        onClick={openModal}
                        className="hidden sm:block bg-gray-900 hover:bg-gray-800 text-white font-bold py-2.5 px-6 rounded-full text-sm transition-colors"
                    >
                        Få offert
                    </button>

                    <button
                        className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Öppna meny"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-2 animate-in slide-in-from-top-2">
                    <Link
                        href="/"
                        className="text-gray-800 font-bold py-3 px-4 hover:bg-gray-50 rounded-xl"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        START
                    </Link>
                    <Link
                        href="/malerifirma"
                        className="text-gray-800 font-bold py-3 px-4 hover:bg-gray-50 rounded-xl"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        HITTA MÅLARE
                    </Link>
                    <Link
                        href="/#counties"
                        className="text-gray-800 font-bold py-3 px-4 hover:bg-gray-50 rounded-xl"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        OM OSS
                    </Link>
                    <div className="h-px bg-gray-100 my-2"></div>
                    <button
                        onClick={() => {
                            openModal();
                            setIsMobileMenuOpen(false);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-center shadow-md transition-colors w-full"
                    >
                        Få offert
                    </button>
                </div>
            )}
        </header>
    );
}
