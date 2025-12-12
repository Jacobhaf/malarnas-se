
import Link from 'next/link';
import { getCounties } from '@/lib/data';
import { slufigy } from '@/lib/utils';

export default function Header() {
    const counties = getCounties();

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-black text-gray-900 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">M</span>
                    Målarnas.se
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">START</Link>

                    <div className="relative group">
                        <button className="text-gray-600 group-hover:text-blue-600 font-medium transition-colors flex items-center gap-1 py-4">
                            MÅLARE PER LÄN
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 p-2 max-h-[80vh] overflow-y-auto">
                            {counties.map((county) => (
                                <Link
                                    key={county}
                                    href={`/malerifirma/${slufigy(county)}`}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                                >
                                    {county}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link href="/#counties" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">OM OSS</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link
                        href="/#counties"
                        className="hidden sm:block bg-gray-900 hover:bg-gray-800 text-white font-bold py-2.5 px-6 rounded-full text-sm transition-colors"
                    >
                        Hitta målare
                    </Link>
                </div>
            </div>
        </header>
    );
}
