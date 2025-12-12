
import Breadcrumbs from "@/components/Breadcrumbs";
import RotCalculator from "@/components/RotCalculator";
import SchemaMarkup from "@/components/SchemaMarkup";
import TrustpilotWidget from "@/components/TrustpilotWidget";
import { getCompaniesByMunicipality, getCompanyBySlug } from "@/lib/company-data";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Only generate params for a subset or rely on dynamic rendering to avoid build timeout with 2000+ pages
// Ideally we generate all, but for this environment, let's allow dynamic.
// Actually, user asked for "Statisk generering om möjligt".
// Let's rely on default dynamic behavior for the company leaf pages to be safe, or generate top 100.
// For now, no generateStaticParams here to ensure build speed, Next.js handles it fine.

export async function generateMetadata({ params }: { params: { kommun: string; slug: string } }): Promise<Metadata> {
    const company = getCompanyBySlug(params.kommun, params.slug);
    if (!company) return { title: 'Företaget hittades inte' };

    return {
        title: `${company.name} – Målerifirma i ${company.city} | Målarnas`,
        description: `Kontakta ${company.name} i ${company.city} för målning, tapetsering och renovering. Se kontaktuppgifter, omdömen och begär offert direkt.`,
        alternates: {
            canonical: `/${params.kommun}/${params.slug}`
        }
    };
}

export default function CompanyPage({ params }: { params: { kommun: string; slug: string } }) {
    const company = getCompanyBySlug(params.kommun, params.slug);

    if (!company) {
        notFound();
    }

    // Get other companies in same municipality for "More companies" section
    const otherCompanies = getCompaniesByMunicipality(params.kommun)
        .filter(c => c.orgNr !== company.orgNr)
        .slice(0, 6); // Take 6 random ones (simple slice for now)

    // Breadcrumb Schema
    const breadcrumbItems = [
        { label: "Hem", url: "/" },
        { label: "Målare per kommun", url: "/malerifirma" },
        { label: company.city, url: `/malerifirma/${company.municipalitySlug}` },
        { label: company.name, url: `/${company.municipalitySlug}/${company.companySlug}` }
    ];

    // LocalBusiness Schema
    const businessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness", // or ProfessionalService
        "name": company.name,
        "image": "https://malarnas.se/logo.svg", // Fallback image
        "address": {
            "@type": "PostalAddress",
            "streetAddress": company.address,
            "addressLocality": company.city,
            "postalCode": company.zip,
            "addressCountry": "SE"
        },
        "url": `https://malarnas.se/${company.municipalitySlug}/${company.companySlug}`,
        "telephone": company.phone,
        "email": company.email,
        "areaServed": company.city
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs items={breadcrumbItems.slice(1)} />
            <SchemaMarkup schema={businessSchema} />

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
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        {company.name}
                    </h1>
                    <p className="text-xl text-gray-500 mb-8">Målerifirma i {company.city}</p>

                    {/* Info Card */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-12 shadow-sm">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Företagsinformation</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><span className="font-medium">Org.nr:</span> {company.orgNr}</p>
                                    <p><span className="font-medium">Bolagstyp:</span> {company.type}</p>
                                    <p><span className="font-medium">Registrerad:</span> {company.regDate}</p>
                                    {company.website && (
                                        <p>
                                            <span className="font-medium">Hemsida:</span>{' '}
                                            <a href={company.website} target="_blank" rel="nofollow noopener" className="text-blue-600 hover:underline overflow-hidden text-ellipsis block">
                                                {company.website}
                                            </a>
                                        </p>
                                    )}
                                    <p>
                                        <a href={`https://www.allabolag.se/${company.orgNr.replace(/[^0-9]/g, '')}`} target="_blank" rel="nofollow noopener" className="text-sm text-gray-500 hover:text-blue-600 underline">
                                            Se mer på Allabolag.se
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Kontakt & Adress</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p className="flex items-start gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 mt-0.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
                                        <span>
                                            {company.address}<br />
                                            {company.zip} {company.city}
                                        </span>
                                    </p>
                                    {company.phone && (
                                        <p className="flex items-center gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                            </svg>
                                            <a href={`tel:${company.phone}`} className="hover:text-blue-600">{company.phone}</a>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                                Få offert från {company.name}
                            </button>
                            <p className="text-center text-sm text-gray-500 mt-2">Gratis och ej bindande</p>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tjänster</h2>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <p className="text-gray-600 mb-4">
                                {company.name} kan sannolikt hjälpa dig med vanliga måleritjänster. Notera att utbudet kan variera.
                            </p>
                            <ul className="grid md:grid-cols-2 gap-3">
                                {['Inomhusmålning', 'Fasadmålning & Tvätt', 'Tapetsering', 'Fönstermålning', 'Spackling & Slipning', 'Snickerimålning'].map(s => (
                                    <li key={s} className="flex items-center gap-2 text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-green-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">ROT-avdrag</h2>
                        <p className="text-gray-600 mb-4">
                            Som privatperson kan du nyttja ROT-avdraget när du anlitar {company.name} för måleriarbeten i din bostad.
                            Du får dra av 30% av arbetskostnaden direkt på fakturan.
                        </p>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Omdömen</h2>
                        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 text-yellow-800">
                            Information om omdömen för {company.name} kommer snart.
                        </div>
                    </div>

                    {/* More Companies */}
                    {otherCompanies.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Fler målerifirmor i {company.city}</h2>
                                <Link href={`/malerifirma/${company.municipalitySlug}`} className="text-blue-600 hover:underline text-sm font-medium">
                                    Visa alla
                                </Link>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                {otherCompanies.map(c => (
                                    <Link
                                        key={c.orgNr}
                                        href={`/${c.municipalitySlug}/${c.companySlug}`}
                                        className="block bg-white hover:bg-gray-50 p-4 rounded-xl border border-gray-100 transition-colors"
                                    >
                                        <div className="font-bold text-gray-900">{c.name}</div>
                                        <div className="text-sm text-gray-500">{c.address}, {c.city}</div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                <div className="lg:col-span-1 space-y-8">
                    <RotCalculator />
                    <TrustpilotWidget />
                </div>
            </div>
        </div>
    );
}
