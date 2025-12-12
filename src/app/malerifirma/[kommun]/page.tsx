
import CompanyCard from "@/components/CompanyCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import RotCalculator from "@/components/RotCalculator";
import SchemaMarkup from "@/components/SchemaMarkup";
import TrustpilotWidget from "@/components/TrustpilotWidget";
import { getCompaniesByMunicipality, getMunicipalityPaths } from "@/lib/company-data";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Generate static params for all municipalities
export async function generateStaticParams() {
    const paths = getMunicipalityPaths();
    return paths.map((kommun) => ({
        kommun: kommun,
    }));
}

export async function generateMetadata({ params }: { params: { kommun: string } }): Promise<Metadata> {
    const companies = getCompaniesByMunicipality(params.kommun);
    if (companies.length === 0) return { title: 'Sidan hittades inte' };

    const cityName = companies[0].city;

    return {
        title: `Målerifirma ${cityName} – Jämför målare & få offerter inom 24 timmar | Målarnas`,
        description: `Hitta kvalitetssäkrade målare och målerifirmor i ${cityName}. Jämför offerter, läs omdömen och se priser för fasadmålning och inomhusmålning i ${cityName}.`,
        alternates: {
            canonical: `/malerifirma/${params.kommun}`
        }
    };
}

export default function MunicipalityPage({ params }: { params: { kommun: string } }) {
    // Decode percent-encoded chars (e.g. %C3%A5 -> å) to match what we expect in logic
    const decodedKommun = decodeURIComponent(params.kommun);
    const companies = getCompaniesByMunicipality(decodedKommun);

    if (companies.length === 0) {
        // If no companies found in this slug (or slug is invalid), check if we should show a basic empty state or 404.
        // Given we generate static params from existing data, this usually means 404 for random URLs.
        notFound();
    }

    const cityName = companies[0].city; // Use the city name from the first company data for display

    // Breadcrumb Schema
    const breadcrumbItems = [
        { label: "Hem", url: "/" },
        { label: "Målare per kommun", url: "/malerifirma" },
        { label: cityName, url: `/malerifirma/${params.kommun}` }
    ];

    // FAQ Schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `Finns det bra målare i ${cityName}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Ja, vi listar ${companies.length} certifierade målerifirmor i ${cityName} som kan hjälpa dig med allt från tapetsering till fasadmålning.`
                }
            },
            {
                "@type": "Question",
                "name": "Hur begär jag en offert?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Klicka på 'Begär offert' vid det företag du är intresserad av, eller använd vårt allmänna formulär för att få svar från flera aktörer."
                }
            }
        ]
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs items={breadcrumbItems.slice(1)} /> {/* Breadcrumbs component expects array of {label, url}, skipping 'Hem' visually if component adds it, but let's pass tailored list */}
            <SchemaMarkup schema={faqSchema} />

            {/* Breadcrumb Schema Injection */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": breadcrumbItems.map((item, index) => ({
                            "@type": "ListItem",
                            "position": index + 1,
                            "name": item.label,
                            "item": "https://malarnas.se" + item.url
                        }))
                    })
                }}
            />

            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Målare & målerifirmor i {cityName} – offerter på 24 h
                    </h1>

                    <div className="bg-blue-50 p-8 rounded-2xl shadow-sm border border-blue-100 mb-12">
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            Söker du en pålitlig <strong>målerifirma i {cityName}</strong>? Oavsett om det gäller <strong>inomhusmålning i {cityName}</strong>, tapetsering eller en omfattande <strong>fasadmålning i {cityName}</strong>, hjälper vi dig att hitta rätt.
                        </p>
                        <Link
                            href="#offert"
                            className="inline-block bg-[#22c55e] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-transform hover:scale-105 shadow-lg w-full md:w-auto text-center"
                        >
                            Få offerter från lokala målare i {cityName}
                        </Link>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Populära måleritjänster i {cityName}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['Inomhusmålning', 'Fasadmålning', 'Tapetsering', 'Spackling'].map(service => (
                                <div key={service} className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100 text-sm font-medium text-gray-700">
                                    {service}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Aktiva måleriföretag i {cityName}
                        </h2>
                        <span className="text-sm text-gray-500">{companies.length} företag</span>
                    </div>

                    <div className="space-y-4 mb-12">
                        {companies.map((company) => (
                            <div key={company.orgNr} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <Link
                                        href={`/${company.municipalitySlug}/${company.companySlug}`}
                                        className="text-xl font-bold text-gray-900 hover:text-blue-600 block mb-1"
                                    >
                                        {company.name}
                                    </Link>
                                    <div className="text-sm text-gray-500 space-y-1">
                                        <p>{company.type} • Org.nr: {company.orgNr}</p>
                                        <p>{company.address}, {company.zip} {company.city}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-full md:w-auto">
                                    <Link
                                        href={`/${company.municipalitySlug}/${company.companySlug}`}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg text-center transition-colors text-sm"
                                    >
                                        Begär offert
                                    </Link>
                                    {/* Nofollow link to allabolag as requested, if we can construct it, otherwise generic google search or just hide it here and keep on detail page. User asked for it in list view too. */}
                                    <a
                                        href={`https://www.allabolag.se/${company.orgNr.replace(/[^0-9]/g, '')}`}
                                        rel="nofollow noopener"
                                        target="_blank"
                                        className="text-xs text-gray-400 hover:text-gray-600 text-center"
                                    >
                                        Se på Allabolag
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-8">
                    <RotCalculator />
                    <TrustpilotWidget />
                </div>
            </div>
        </div>
    );
}
