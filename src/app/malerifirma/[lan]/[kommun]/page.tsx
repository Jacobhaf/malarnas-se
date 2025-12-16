
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import RotCalculator from "@/components/RotCalculator";
import SchemaMarkup from "@/components/SchemaMarkup";
import TrustpilotWidget from "@/components/TrustpilotWidget";
import { getAllMunicipalitiesFromRaw, getCompaniesByMunicipality, getMunicipalityParams } from "@/lib/company-data";
import { COUNTY_SEO_DATA } from '@/data/county-seo-data';
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from 'next/image';
import RequestQuoteButton from "@/components/RequestQuoteButton";

import FaqSection from "@/components/FaqSection";
import { getFaqData } from "@/lib/faq-data";
import JobList from "@/components/JobList";
import { searchJobs } from "@/lib/job-api";

// Generate static params for all municipality+county pairs
export async function generateStaticParams() {
    return getMunicipalityParams();
}

export async function generateMetadata({ params }: { params: Promise<{ lan: string, kommun: string }> }): Promise<Metadata> {
    const { lan, kommun } = await params;
    const decodedKommun = decodeURIComponent(kommun);

    // Find municipality info from raw data
    const municipalities = getAllMunicipalitiesFromRaw();
    const municipalityInfo = municipalities.find(m => m.slug === kommun || m.slug === decodedKommun); // Robust check

    if (!municipalityInfo) {
        return { title: 'Sidan hittades inte' };
    }

    const cityName = municipalityInfo.name;
    const countyName = municipalityInfo.county;

    return {
        title: `Målerifirma ${cityName} – Jämför målare & få offerter`,
        description: `Hitta kvalitetssäkrade målare och målerifirmor i ${cityName}, ${countyName}. Jämför offerter, läs omdömen och se priser för fasadmålning och inomhusmålning i ${cityName}.`,
        alternates: {
            canonical: `/malerifirma/${lan}/${kommun}`
        }
    };
}

export default async function MunicipalityPage({ params }: { params: Promise<{ lan: string, kommun: string }> }) {
    const { lan, kommun } = await params;

    // Decode percent-encoded chars (e.g. %C3%A5 -> å) to match what we expect in logic
    const decodedKommun = decodeURIComponent(kommun);

    // Get Basic Info
    const allMunis = getAllMunicipalitiesFromRaw();
    const municipalityInfo = allMunis.find(m => m.slug === kommun || m.slug === decodedKommun);

    if (!municipalityInfo) {
        // Fallback: Check if we can derive from companies if raw data is missing (unlikely given previous steps)
        const companiesFallback = getCompaniesByMunicipality(decodedKommun);
        if (companiesFallback.length > 0) {
            // We found companies but no raw mapping? Use company data
            // This is an edge case.
        } else {
            return notFound();
        }
    }

    // Ensure we have valid names
    const cityName = municipalityInfo?.name || decodedKommun;
    const countyName = municipalityInfo?.county || "Sverige";

    // Get Companies
    // Filter by both municipality and county to ensure valid URL hierarchy
    // Note: getCompaniesByMunicipality uses the slug.
    const companies = getCompaniesByMunicipality(decodedKommun).filter(c => c.countySlug === lan);

    // Breadcrumb Schema
    const breadcrumbItems = [
        { label: "Hem", url: "/" },
        { label: "Målerifirma", url: "/malerifirma" },
        { label: countyName, url: `/malerifirma/${lan}` },
        { label: cityName, url: `/malerifirma/${lan}/${kommun}` }
    ];

    // FAQ Data
    const faqItems = getFaqData(cityName);

    // SEO Data from County (reuse climate text etc)
    const countySeo = COUNTY_SEO_DATA[lan] || { climateText: 'lokala förhållanden' };

    return (
        <main className="min-h-screen bg-gray-50">
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
            {/* FaqSection handles its own schema */}

            {/* Hero Section */}
            <div className="bg-[#0b1e33] text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#0b1e33]/80 z-10"></div>
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                    >
                        <source src="/videos/hero-background.mp4?v=2" type="video/mp4" />
                    </video>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <Breadcrumbs
                        items={breadcrumbItems.slice(1)} // Skip Home in display if desired, or keep all.
                        className="mb-8 text-gray-300"
                    />
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Målerifirma {cityName}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
                        Hitta och jämför lokala målare i {cityName}. Få upp till 4 offerter gratis & välj rätt företag för ditt projekt.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Intro Text */}
                        <section className="prose prose-lg max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Söker du målare i {cityName}?</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Bor du i {cityName} och behöver hjälp med målning? Då har du hittat rätt! Vi hjälper dig att enkelt komma i kontakt med seriösa målerifirmor i {countyName} och {cityName}.
                                Våra anslutna målare kan hantera allt från små inomhusjobb till större fasadrenoveringar, alltid med fokus på kvalitet och nöjda kunder.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Genom att använda vår tjänst kan du snabbt få offerter från flera olika företag. Jämför priser och omdömen i lugn och ro innan du bestämmer dig. Det är helt gratis och du förbinder dig inte till något!
                            </p>
                        </section>

                        {/* Images - Reusing County Images for consistency/availability */}
                        <section className="grid md:grid-cols-2 gap-6">
                            <figure>
                                <Image
                                    src="/images/lan/interior-green-room.png"
                                    alt={`Professionell invändig målning i ${cityName}`}
                                    width={600}
                                    height={400}
                                    className="rounded-xl shadow-md w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-300"
                                />
                                <figcaption className="text-sm text-gray-500 mt-2 text-center italic">Förnya hemmet med professionell hjälp i {cityName}</figcaption>
                            </figure>
                            <figure>
                                <Image
                                    src="/images/lan/interior-living-room.png"
                                    alt={`Vardagsrum målat av proffs i ${cityName}`}
                                    width={600}
                                    height={400}
                                    className="rounded-xl shadow-md w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-300"
                                />
                                <figcaption className="text-sm text-gray-500 mt-2 text-center italic">Vi matchar dig med rätt målare i {cityName}</figcaption>
                            </figure>
                        </section>

                        {/* Why Choose Us */}
                        <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Varför anlita en målerifirma i {cityName} via oss?</h2>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Lokalkännedom</h3>
                                        <p className="text-gray-600">Firmor vana vid {countySeo.climateText}.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Snabbt & Enkelt</h3>
                                        <p className="text-gray-600">Få offerter inom 24 timmar oftast.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Trygghet</h3>
                                        <p className="text-gray-600">Vi samarbetar med seriösa aktörer.</p>
                                    </div>
                                </li>
                            </ul>
                        </section>

                        {/* Images - Facade */}
                        <section className="grid md:grid-cols-3 gap-4 mb-12">
                            <figure className="md:col-span-1">
                                <Image
                                    src="/images/lan/exterior-red-house.jpg"
                                    alt={`Fasadmålning av trähus i ${cityName}`}
                                    width={400}
                                    height={500}
                                    className="rounded-xl shadow-md w-full h-48 md:h-64 object-cover hover:scale-[1.02] transition-transform duration-300"
                                />
                                <figcaption className="text-xs text-gray-500 mt-2 text-center">Fasadrenovering i {cityName}</figcaption>
                            </figure>
                            <figure className="md:col-span-1">
                                <Image
                                    src="/images/lan/roof-maintenance.jpg"
                                    alt={`Takmålning och underhåll i ${cityName}`}
                                    width={400}
                                    height={500}
                                    className="rounded-xl shadow-md w-full h-48 md:h-64 object-cover hover:scale-[1.02] transition-transform duration-300"
                                />
                                <figcaption className="text-xs text-gray-500 mt-2 text-center">Takunderhåll i {cityName}</figcaption>
                            </figure>
                            <figure className="md:col-span-1">
                                <Image
                                    src="/images/lan/exterior-green-house.jpg"
                                    alt={`Målade fönster och fasad i ${cityName}`}
                                    width={400}
                                    height={500}
                                    className="rounded-xl shadow-md w-full h-48 md:h-64 object-cover hover:scale-[1.02] transition-transform duration-300"
                                />
                                <figcaption className="text-xs text-gray-500 mt-2 text-center">Detaljmålning i {cityName}</figcaption>
                            </figure>
                        </section>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Populära tjänster i {cityName}</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['Inomhusmålning', 'Fasadmålning', 'Tapetsering', 'Spackling'].map(service => (
                                    <div key={service} className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-default">
                                        {service}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Companies List */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Aktiva måleriföretag i {cityName}
                            </h2>
                            <span className="text-sm text-gray-500">{companies.length} företag</span>
                        </div>

                        {companies.length > 0 ? (
                            <div className="space-y-4 mb-12">
                                {companies.map((company) => (
                                    <div key={company.orgNr} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <Link
                                                href={`/malerifirma/${company.countySlug}/${company.municipalitySlug}/${company.companySlug}`}
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
                                            <RequestQuoteButton
                                                className="py-2 px-6 font-medium text-sm w-full md:w-auto"
                                                text="Begär offert"
                                            />
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
                        ) : (
                            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 text-center mb-12">
                                <p className="text-yellow-800 font-medium mb-2">
                                    Just nu visas inga specifika målerifirmor i {cityName} i vår lista.
                                </p>
                                <p className="text-yellow-700 text-sm">
                                    Men du kan fortfarande göra en gratis förfrågan för att nå målare i hela {countyName} som jobbar i ditt område!
                                </p>
                            </div>
                        )}

                        <JobList
                            jobs={await searchJobs(cityName, 5)}
                            title={`Lediga målarjobb i ${cityName}`}
                            locationName={cityName}
                            showEmptyMessage={false}
                        />

                        <FaqSection items={faqItems} areaName={cityName} />

                        {/* How it works */}
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Så beställer du hjälp:</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">1</div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Beskriv jobbet</h3>
                                        <p className="text-gray-600">Tala om vad du vill ha hjälp med i {cityName}.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">2</div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Jämför</h3>
                                        <p className="text-gray-600">Få svar från intresserade firmor.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">3</div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Klart!</h3>
                                        <p className="text-gray-600">Välj den offert som passar dig bäst.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Conclusion */}
                        <section className="bg-green-600 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                            <div className="relative z-10 text-center">
                                <h2 className="text-2xl font-bold mb-4">Redo att sätta igång?</h2>
                                <p className="text-green-100 mb-6 text-lg">
                                    Slipp leta själv – låt målarna komma till dig. Tjänsten är helt gratis!
                                </p>
                                <LeadForm />
                            </div>
                        </section>

                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-8">
                        <div className="sticky top-4 space-y-8">
                            <LeadForm />
                            <RotCalculator />
                            <TrustpilotWidget />
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
