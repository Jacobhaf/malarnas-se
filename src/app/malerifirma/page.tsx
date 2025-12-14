
import { getAllCounties } from "@/lib/company-data";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Målare per län - Hela Sverige | Målarnas.se',
    description: 'Hitta en målerifirma i ditt län. Vi listar målare i alla Sveriges län och kommuner.',
    alternates: {
        canonical: '/malerifirma'
    }
};

export default function MalerifirmaIndexPage() {
    const counties = getAllCounties();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <nav className="mb-8 text-sm text-gray-500">
                    <Link href="/" className="hover:underline">Hem</Link> &gt; <span>Målerifirma</span>
                </nav>

                <h1 className="text-4xl font-bold text-gray-900 mb-8">Hitta målare i ditt län</h1>
                <p className="text-xl text-gray-600 mb-12">
                    Välj ditt län nedan för att se tillgängliga orter och hitta lokala måleriföretag nära dig.
                </p>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {counties.map(county => (
                            <Link
                                key={county.slug}
                                href={`/malerifirma/${county.slug}`}
                                className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-gray-800 font-medium bg-gray-50 hover:bg-white"
                            >
                                {county.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
