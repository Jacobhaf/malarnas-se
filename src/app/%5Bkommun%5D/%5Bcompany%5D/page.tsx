
import Breadcrumbs from "@/components/Breadcrumbs";
import RotCalculator from "@/components/RotCalculator";
import SchemaMarkup from "@/components/SchemaMarkup";
import TrustpilotWidget from "@/components/TrustpilotWidget";
import { getCompanies, getCompanyBySlug, getMunicipalityBySlug, getMunicipalitySlugForCompany } from "@/lib/data";
import { slufigy } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const companies = getCompanies();
    // Limit static generation for dev environment if too many pages, but 1200 is acceptable for build.
    // In dev mode, dynamic access works without generateStaticParams fully populated sometimes, but for production build it is needed.
    return companies.map((c) => ({
        kommun: getMunicipalitySlugForCompany(c),
        company: slufigy(c.name),
    }));
}

export async function generateMetadata({ params }: { params: { kommun: string; company: string } }): Promise<Metadata> {
    const company = getCompanyBySlug(params.company);
    if (!company) return { title: 'Företaget hittades inte' };

    return {
        title: `${company.name} - Omdömen & Kontaktuppgifter`,
        description: `Läs omdömen, se kontaktuppgifter och begär offert från ${company.name} i ${company.city}. Certifierad målerifirma.`,
    };
}

export default function CompanyPage({ params }: { params: { kommun: string; company: string } }) {
    const company = getCompanyBySlug(params.company);
    const municipality = getMunicipalityBySlug(params.kommun);

    if (!company) {
        notFound();
    }

    // Fallback municipality name if not found strictly
    const municipalityName = municipality ? municipality.kommun : company.city;

    // LocalBusiness Schema
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": company.name,
        "image": "https://malarnas.se/logo.png", // Placeholder
        "@id": `https://malarnas.se/${params.kommun}/${params.company}`,
        "url": company.website || `https://malarnas.se/${params.kommun}/${params.company}`,
        "telephone": company.phone,
        "email": company.email,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": company.address,
            "addressLocality": company.city,
            "postalCode": company.zip,
            "addressCountry": "SE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "", // Would need geocoding
            "longitude": ""
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "12" // Placeholder simulation
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs
                items={[
                    { label: `Målare ${municipalityName}`, url: `/malerifirma/${municipality?.lan ? slufigy(municipality.lan) : 'sverige'}/${params.kommun}` },
                    { label: company.name, url: `/${params.kommun}/${params.company}` }
                ]}
            />
            <SchemaMarkup schema={schema} />

            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{company.name}</h1>
                        <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                            <span className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                {company.address}, {company.zip} {company.city}
                            </span>
                            <span className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>
                                {company.phone || 'Telefonnummer saknas'}
                            </span>
                        </div>

                        <div className="flex gap-4">
                            <a href={`tel:${company.phone}`} className="bg-primary hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                                Ring {company.name}
                            </a>
                            {company.website && (
                                <a href={company.website} target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors">
                                    Besök hemsida
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Om {company.name}</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            {company.name} är ett aktivt måleriföretag registrerat i {company.city}. Företaget grundades {company.registrationDate} och är verksamt inom måleri och relaterade tjänster.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li><strong>Org.nummer:</strong> {company.orgNr}</li>
                            <li><strong>Bolagsform:</strong> {company.type}</li>
                            <li><strong>Registrerat:</strong> {company.registrationDate}</li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Behöver du hjälp med målning?</h3>
                        <p className="text-gray-600 mb-6">Skapa en förfrågan så matchar vi dig med upp till 5 lokala målare.</p>
                        <button className="bg-primary hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
                            Få offerter nu
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-8">
                    <RotCalculator />
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Hitta hit</h3>
                        <div className="rounded-lg overflow-hidden bg-gray-100 h-64">
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight={0}
                                marginWidth={0}
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(company.address + ', ' + company.city)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                title={`Karta till ${company.name}`}
                            ></iframe>
                        </div>
                    </div>
                    <TrustpilotWidget />
                </div>
            </div>
        </div>
    );
}
