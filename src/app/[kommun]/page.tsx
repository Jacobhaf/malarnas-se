
import Breadcrumbs from "@/components/Breadcrumbs";
import CompanyCard from "@/components/CompanyCard";
import RotCalculator from "@/components/RotCalculator";
import SchemaMarkup from "@/components/SchemaMarkup";
import TrustpilotWidget from "@/components/TrustpilotWidget";
import { getCompaniesByMunicipality, getMunicipalityBySlug } from "@/lib/data";
import { slufigy } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { kommun: string } }): Promise<Metadata> {
    const municipality = getMunicipalityBySlug(params.kommun);
    if (!municipality) return { title: 'Sidan hittades inte' };

    return {
        title: `Målare ${municipality.kommun} - Jämför priser & omdömen`,
        description: `Hitta kvalitetssäkrade målare i ${municipality.kommun}. Jämför offerter, läs omdömen och se priser för ditt måleriprojekt i hela ${municipality.kommun}.`,
        alternates: {
            canonical: `/${params.kommun}`
        }
    };
}

export default function MunicipalityRootPage({ params }: { params: { kommun: string } }) {
    const municipality = getMunicipalityBySlug(params.kommun);

    if (!municipality) {
        notFound();
    }

    const companies = getCompaniesByMunicipality(municipality.kommun);

    // FAQ Schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `Finns det bra målare i ${municipality.kommun}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Ja, vi listar ${companies.length > 0 ? companies.length : 'flera'} certifierade målerifirmor i ${municipality.kommun} som kan hjälpa dig med allt från tapetsering till fasadmålning.`
                }
            },
            {
                "@type": "Question",
                "name": "Hur får jag bästa pris på målare?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Det bästa sättet är att jämföra offerter från flera olika företag. Genom vår tjänst kan du enkelt kontakta lokala målare för prisförslag."
                }
            }
        ]
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs
                items={[
                    { label: `Målerifirma ${municipality.lan}`, url: `/malerifirma/${slufigy(municipality.lan)}` },
                    { label: `Målare ${municipality.kommun}`, url: `/${params.kommun}` }
                ]}
            />
            <SchemaMarkup schema={faqSchema} />

            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">
                        Målare & Målerifirmor i {municipality.kommun}
                    </h1>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
                        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                            Välkommen till din lokala guide för måleritjänster i {municipality.kommun}. Här hittar du de bästa och mest pålitliga målarfirmorna i området, redo att ta sig an ditt projekt.
                        </p>
                        <p className="text-gray-600">
                            Oavsett om du bor centralt i {municipality.kommun} eller i ytterområdena, hjälper vi dig att hitta rätt hantverkare. Jämför omdömen, referenser och priser för att göra ett tryggt val.
                        </p>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {companies.length} Måleriföretag i {municipality.kommun}
                        </h2>
                    </div>

                    {companies.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6 mb-12">
                            {companies.map((company) => (
                                <CompanyCard
                                    key={company.orgNr}
                                    company={company}
                                    municipalitySlug={params.kommun}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-yellow-50 p-6 rounded-lg mb-12 border border-yellow-100 text-yellow-800">
                            Just nu hittar vi inga firmor med sätet direkt i {municipality.kommun}, men titta gärna på företag i grannkommunerna i {municipality.lan}.
                        </div>
                    )}
                </div>

                <div className="lg:col-span-1 space-y-8">
                    <RotCalculator />
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Om {municipality.kommun}</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            {municipality.kommun} ligger i {municipality.lan} och har cirka {municipality.folkMangd.toLocaleString()} invånare.
                        </p>
                        <div className="rounded-lg overflow-hidden bg-gray-100 h-48">
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight={0}
                                marginWidth={0}
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(municipality.kommun + ', Sverige')}&t=&z=9&ie=UTF8&iwloc=&output=embed`}
                                title={`Karta över ${municipality.kommun}`}
                            ></iframe>
                        </div>
                    </div>
                    <TrustpilotWidget />
                </div>
            </div>
        </div>
    );
}
