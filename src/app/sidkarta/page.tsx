
import Link from 'next/link';
import { getAllCounties, getMunicipalitiesInCounty, getCompaniesByMunicipality } from '@/lib/company-data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sidkarta - Målarnas.se',
    description: 'Översikt över alla sidor på Målarnas.se. Hitta målare i ditt län och kommun.',
};

export default function SitemapPage() {
    const counties = getAllCounties();

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Sidkarta</h1>
            <p className="text-gray-600 mb-12">Här hittar du en översikt över alla våra registrerade måleriföretag sorterade efter län och kommun.</p>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {counties.map((county) => {
                        const municipalities = getMunicipalitiesInCounty(county.slug);
                        if (municipalities.length === 0) return null;

                        return (
                            <div key={county.slug} className="mb-4">
                                <Link
                                    href={`/malerifirma/${county.slug}`}
                                    className="text-xl font-bold text-gray-900 hover:text-blue-600 mb-4 block border-b pb-2"
                                >
                                    {county.name}
                                </Link>
                                <div className="space-y-6">
                                    {municipalities.map((m) => {
                                        const companies = getCompaniesByMunicipality(m.slug);
                                        return (
                                            <div key={m.slug} className="ml-2">
                                                <Link
                                                    href={`/malerifirma/${county.slug}/${m.slug}`}
                                                    className="text-base font-semibold text-gray-800 hover:text-blue-600 block mb-2"
                                                >
                                                    {m.name}
                                                </Link>
                                                <ul className="pl-4 space-y-1 border-l-2 border-gray-100 ml-1">
                                                    {companies.map((c) => (
                                                        <li key={c.orgNr} className="mb-2">
                                                            <Link
                                                                href={`/${c.municipalitySlug}/${c.companySlug}`}
                                                                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors block"
                                                            >
                                                                {c.name}
                                                            </Link>
                                                            <span className="text-xs text-gray-400 font-mono block break-all">
                                                                /{c.municipalitySlug}/{c.companySlug}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
