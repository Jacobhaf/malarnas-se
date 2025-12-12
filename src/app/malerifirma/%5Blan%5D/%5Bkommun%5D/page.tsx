
import Breadcrumbs from "@/components/Breadcrumbs";
import CompanyCard from "@/components/CompanyCard";
import RotCalculator from "@/components/RotCalculator";
import SchemaMarkup from "@/components/SchemaMarkup";
import TrustpilotWidget from "@/components/TrustpilotWidget";
import { getCompaniesByMunicipality, getCounties, getLocations, getMunicipalityBySlug } from "@/lib/data";
import { slufigy } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const locations = getLocations();
    return locations.map((l) => ({
        lan: slufigy(l.lan),
        kommun: slufigy(l.kommun),
    }));
}

export async function generateMetadata({ params }: { params: { lan: string; kommun: string } }): Promise<Metadata> {
    const municipality = getMunicipalityBySlug(params.kommun);
    if (!municipality) return { title: 'Kommun hittades inte' };

    return {
        title: `Målare ${municipality.kommun} - Jämför firmor & offerter`,
        description: `Söker du målare i ${municipality.kommun}? Jämför lokala målerifirmor, se omdömen och få gratis offerter. Vi listar kvalitetssäkrade målare nära dig.`,
    };
}

export default function MunicipalityPage({ params }: { params: { lan: string; kommun: string } }) {
    const municipality = getMunicipalityBySlug(params.kommun);

    if (!municipality) {
        notFound();
    }

    const companies = getCompaniesByMunicipality(municipality.kommun);

    // SEO: FAQ Schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `Vad kostar det att anlita en målare i ${municipality.kommun}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Priset för en målare i ${municipality.kommun} varierar beroende på projektets omfattning, men timpriset ligger ofta mellan 500 och 700 kr inklusive moms, innan ROT-avdrag.`
                }
            },
            {
                "@type": "Question",
                "name": "Kan jag utnyttja ROT-avdrag?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ja, som privatperson kan du dra av 30% av arbetskostnaden upp till 50 000 kr per år och person."
                }
            },
            {
                "@type": "Question",
                "name": `Vilka målerifirmor finns i ${municipality.kommun}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Vi listar ${companies.length > 0 ? companies.length : 'flera'} måleriföretag i ${municipality.kommun}, bland annat ${companies.slice(0, 3).map(c => c.name).join(', ')}.`
                }
            }
        ]
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs
                items={[
                    { label: `Målerifirma ${municipality.lan}`, url: `/malerifirma/${params.lan}` },
                    { label: `Målare ${municipality.kommun}`, url: `/malerifirma/${params.lan}/${params.kommun}` }
                ]}
            />
            <SchemaMarkup schema={faqSchema} />

            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Målare i {municipality.kommun}
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        Bor du i {municipality.kommun} (med ca {municipality.folkMangd.toLocaleString()} invånare) och behöver hjälp av en professionell målare?
                        Vi hjälper dig att hitta rätt hantverkare för ditt projekt. Jämför {companies.length} lokala målerifirmor nedan.
                    </p>

                    <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl mb-12">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="flex-grow">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Få offerter från målare i {municipality.kommun}</h3>
                                <p className="text-gray-600">Beskriv ditt uppdrag så matchar vi dig med kvalitetssäkrade företag.</p>
                            </div>
                            <button className="whitespace-nowrap bg-primary hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-sm">
                                Begär offert gratis
                            </button>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Målerifirmor verksamma i {municipality.kommun}</h2>

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
                            Vi hittade inga firmor med kontor registrerat direkt i {municipality.kommun} just nu, men många företag i grannkommunerna och hela {municipality.lan} tar uppdrag här.
                        </div>
                    )}

                    <div className="bg-gray-50 p-8 rounded-2xl mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Vanliga frågor om målare i {municipality.kommun}</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900 mb-2">Vad kostar fasadmålning i {municipality.kommun}?</h3>
                                <p className="text-gray-600">Priset för fasadmålning beror på husets storlek och skick. Ett riktpris är ca 500-700 kr/kvm eller löpande timpris. Begär alltid offert för exakt pris.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900 mb-2">Vilka garantier lämnar företagen?</h3>
                                <p className="text-gray-600">Seriösa företag lämnar ofta garanti på utfört arbete, vanligtvis 2-5 år. Kontrollera detta i offerten.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-8">
                    <RotCalculator />

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Karta över {municipality.kommun}</h3>
                        <div className="rounded-lg overflow-hidden bg-gray-100 h-64">
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight={0}
                                marginWidth={0}
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(municipality.kommun + ', Sverige')}&t=&z=10&ie=UTF8&iwloc=&output=embed`}
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
