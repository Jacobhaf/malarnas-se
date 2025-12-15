"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useQuoteModal } from './providers/QuoteModalProvider';

export default function Header() {
    const { openModal } = useQuoteModal();

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
                        MÅLARE PER KOMMUN
                    </Link>

                    <Link href="/heta-jobb" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                        HETA JOBB
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
                </div>
            </div >
        </header >
    );
}
