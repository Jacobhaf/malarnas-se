import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Image
                                src="/logo-white.svg"
                                alt="Målarnas.se"
                                width={140}
                                height={40}
                                className="h-8 w-auto opacity-90 hover:opacity-100 transition-opacity"
                            />
                        </Link>
                        <p className="max-w-md">
                            Vi hjälper dig att hitta rätt målerifirma för ditt projekt. Jämför lokala företag, läs omdömen och få kostnadsfria offerter snabbt och enkelt.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Snabblänkar</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:text-white transition-colors">Startsida</Link></li>
                            <li><Link href="/#counties" className="hover:text-white transition-colors">Hitta målare</Link></li>
                            <li><Link href="/artiklar" className="hover:text-white transition-colors">Artiklar</Link></li>
                            <li><Link href="/integritetspolicy" className="hover:text-white transition-colors">Integritetspolicy</Link></li>
                            <li><Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
                            <li><Link href="/heta-jobb" className="hover:text-white transition-colors">Heta jobb</Link></li>
                            <li><Link href="/sidkarta" className="hover:text-white transition-colors">Sidkarta</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Kontakt</h4>
                        <p className="mb-2">Har du frågor? Kontakta oss:</p>
                        <a href="mailto:info@malarnas.se" rel="nofollow" className="text-blue-400 hover:text-blue-300 transition-colors">info@malarnas.se</a>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-800 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Målarnas.se. Alla rättigheter reserverade.</p>
                </div>
            </div>
        </footer>
    );
}
