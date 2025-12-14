import { getCountyPaths, getMunicipalitiesInCounty, getAllCounties, getCountyForMunicipality } from "@/lib/company-data";
import Link from "next/link";
import { Metadata } from 'next';
import { notFound, redirect } from "next/navigation";

// Generate static params for all counties
export async function generateStaticParams() {
    const paths = getCountyPaths();
    return paths.map((lan) => ({
        lan: lan,
    }));
}

export async function generateMetadata({ params }: { params: { lan: string } }): Promise<Metadata> {
    const counties = getAllCounties();
    const county = counties.find(c => c.slug === params.lan);

    if (!county) return { title: 'Län hittades inte' };

    return {
        title: `Målerifirma ${county.name} – Hitta målare i din kommun | Målarnas`,
        description: `Hitta kvalitetssäkrade målare och målerifirmor i ${county.name}. Vi listar företag i alla kommuner i länet.`,
        alternates: {
            canonical: `/malerifirma/${params.lan}`
        }
    };
}

export default function CountyPage({ params }: { params: { lan: string } }) {
    const counties = getAllCounties();
    const county = counties.find(c => c.slug === params.lan);

    // Smart Redirect for legacy URLs (e.g. /malerifirma/hedemora -> /malerifirma/dalarnas-lan/hedemora)
    if (!county) {
        const decodedParam = decodeURIComponent(params.lan);
        const municipalityInfo = getCountyForMunicipality(decodedParam);

        if (municipalityInfo) {
            redirect(`/malerifirma/${municipalityInfo.slug}/${decodedParam}`);
        }

        notFound();
    }

    const municipalities = getMunicipalitiesInCounty(params.lan);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <nav className="mb-8 text-sm text-gray-500">
                    <Link href="/" className="hover:underline">Hem</Link> &gt;{" "}
                    <Link href="/malerifirma" className="hover:underline">Målerifirma</Link> &gt;{" "}
                    <span className="text-gray-900">{county.name}</span>
                </nav>

                <h1 className="text-4xl font-bold text-gray-900 mb-8">Målare i {county.name}</h1>
                <p className="text-xl text-gray-600 mb-12">
                    Hitta målare i {county.name}. Välj din kommun nedan för att se lokala företag och begära offerter.
                </p>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {municipalities.map(muni => (
                            <Link
                                key={muni.slug}
                                href={`/malerifirma/${params.lan}/${muni.slug}`}
                                className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-gray-800 font-medium bg-gray-50 hover:bg-white"
                            >
                                {muni.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
