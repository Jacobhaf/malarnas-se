
import Link from 'next/link';
import { getCounties, getMunicipalitiesByCounty } from '@/lib/data';
import { slufigy } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sidkarta - Målarnas.se',
    description: 'Översikt över alla sidor på Målarnas.se. Hitta målare i ditt län och kommun.',
};

export default function SitemapPage() {
    const counties = getCounties();

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Sidkarta</h1>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {counties.map((county) => {
                        const municipalities = getMunicipalitiesByCounty(county);
                        return (
                            <li key={county} className="mb-4">
                                <Link
                                    href={`/malerifirma/${slufigy(county)}`}
                                    className="text-lg font-bold text-gray-900 hover:text-primary mb-2 block"
                                >
                                    {county}
                                </Link>
                                <ul className="pl-4 space-y-1 border-l-2 border-gray-100 ml-1">
                                    {municipalities.map((m) => (
                                        <li key={m.kommun}>
                                            <Link
                                                href={`/malerifirma/${slufigy(county)}/${slufigy(m.kommun)}`}
                                                className="text-sm text-gray-600 hover:text-primary transition-colors block py-0.5"
                                            >
                                                {m.kommun}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
