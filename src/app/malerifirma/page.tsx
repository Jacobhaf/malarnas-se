
import { getAllCompanies, getMunicipalityPaths } from "@/lib/company-data";
import { slufigy } from "@/lib/utils";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Målare per kommun - Alla områden | Målarnas.se',
    description: 'Hitta en målerifirma nära dig. Vi listar målare i alla Sveriges kommuner och orter.',
    alternates: {
        canonical: '/malerifirma'
    }
};

export default function MunicipalityIndexPage() {
    const companies = getAllCompanies();
    // Get unique municipalities (using the normalized city name from the data to look nice)
    const municipalitiesMap = new Map<string, string>(); // slug -> Display Name

    companies.forEach(c => {
        if (!municipalitiesMap.has(c.municipalitySlug)) {
            municipalitiesMap.set(c.municipalitySlug, c.city);
        }
    });

    const sortedMunicipalities = Array.from(municipalitiesMap.keys()).sort((a, b) => {
        return (municipalitiesMap.get(a) || '').localeCompare(municipalitiesMap.get(b) || '');
    });

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Hitta målare i din kommun</h1>
                <p className="text-xl text-gray-600 mb-12">
                    Välj din ort nedan för att se lokala måleriföretag, jämföra omdömen och begära offerter för ditt projekt.
                </p>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {sortedMunicipalities.map(slug => (
                            <Link
                                key={slug}
                                href={`/malerifirma/${slug}`}
                                className="text-gray-700 hover:text-blue-600 hover:underline py-2 block"
                            >
                                {municipalitiesMap.get(slug)}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
