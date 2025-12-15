import { getCountyPaths, getMunicipalitiesInCounty, getAllCounties, getCountyForMunicipality } from "@/lib/company-data";
import Link from "next/link";
import { Metadata } from 'next';
import { notFound, redirect } from "next/navigation";
import { COUNTY_SEO_DATA } from '@/data/county-seo-data';
import Image from 'next/image';
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import TrustpilotWidget from "@/components/TrustpilotWidget";

interface Props {
    params: Promise<{ lan: string }>;
}

// Generate static params for all counties
export async function generateStaticParams() {
    const paths = getCountyPaths();
    return paths.map((lan) => ({
        lan: lan,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lan } = await params;
    const counties = getAllCounties();
    const county = counties.find(c => c.slug === lan);

    if (!county) {
        return {
            title: 'Län hittades inte',
        };
    }

    return {
        title: `Målerifirma ${county.name} - Jämför offerter från lokala målare`,
        description: `Hitta kvalitetssäkrade målare i ${county.name}. Vi listar företag i alla kommuner i länet. Jämför offerter gratis & hitta rätt målerifirma för ditt jobb.`,
    };
}

export default async function CountyPage({ params }: Props) {
    const { lan } = await params;
    const county = getAllCounties().find(c => c.slug === lan);

    // Smart Redirect for legacy URLs (e.g. /malerifirma/Stockholms län -> /malerifirma/stockholms-lan)
    if (!county) {
        const decodedParam = decodeURIComponent(lan);
        const municipalityInfo = getCountyForMunicipality(decodedParam);

        if (municipalityInfo) {
            redirect(`/malerifirma/${municipalityInfo.slug}/${decodedParam}`);
        }

        // Also check if it matches a county name directly but wasn't found by slug
        const countyByName = getAllCounties().find(c => c.name.toLowerCase() === decodedParam.toLowerCase());
        if (countyByName && countyByName.slug !== lan) {
            redirect(`/malerifirma/${countyByName.slug}`);
        }

        notFound();
    }

    const municipalities = getMunicipalitiesInCounty(county.slug);

    // Get SEO data or fallback
    const seoData = COUNTY_SEO_DATA[county.slug] || {
        name: county.name,
        cities: municipalities.slice(0, 5).map(m => m.name),
        climateText: 'lokala förhållanden'
    };

    // Fallback for cities if the predefined list is empty/missing
    const citiesList = seoData.cities.length > 0 ? seoData.cities : municipalities.slice(0, 5).map(m => m.name);
    const cityString = citiesList.slice(0, -1).join(', ') + (citiesList.length > 1 ? ' eller ' : '') + citiesList.slice(-1);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `Målerifirma ${county.name}`,
        description: `Hitta kvalitetssäkrade målare i ${county.name}. Vi hjälper dig jämföra offerter från lokala måleriföretag.`,
        provider: {
            '@type': 'Organization',
            name: 'Målarnas.se',
            url: 'https://malarnas.se'
        },
        areaServed: {
            '@type': 'AdministrativeArea',
            name: county.name
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <div className="bg-gray-900 text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20 z-0"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <Breadcrumbs
                        items={[
                            { label: 'Hem', url: '/' },
                            { label: 'Målerifirma', url: '/malerifirma' },
                            { label: county.name, url: `/malerifirma/${county.slug}` },
                        ]}
                        className="mb-8 text-gray-300"
                    />
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Målerifirma {county.name}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
                        Jämför lokala målare i {county.name}. Få upp till 4 offerter helt gratis och välj rätt företag för ditt projekt.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Intro Text */}
                        <section className="prose prose-lg max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Söker du en pålitlig målerifirma i {county.name}?</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Ja, du har kommit rätt! På Målarna hittar du Sveriges bästa måleriföretag – noga utvalda och certifierade målerifirmor i {county.name}. Oavsett om du bor i {cityString} eller någon annan ort i regionen, matchar vi dig snabbt med lokala proffs som erbjuder högkvalitativ målning till konkurrenskraftiga priser.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Få en prispressad offert inom ett par minuter – helt gratis och utan bindning! Våra samarbetspartners hanterar allt från inomhusmålning och tapetsering till fasadmålning och fönsterrenovering, alltid med ROT-avdrag och garanti på utfört arbete.
                            </p>
                        </section>

                        {/* Images - Interior/Intro */}
                        <section className="grid md:grid-cols-2 gap-6">
                            <figure>
                                <Image
                                    src="/images/lan/interior-green-room.png"
                                    alt={`Professionell invändig målning i ${county.name}`}
                                    width={600}
                                    height={400}
                                    className="rounded-xl shadow-md w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-300"
                                />
                                <figcaption className="text-sm text-gray-500 mt-2 text-center italic">Förnya hemmet med professionell hjälp i {county.name}</figcaption>
                            </figure>
                            <figure>
                                <Image
                                    src="/images/lan/interior-living-room.png"
                                    alt={`Vardagsrum målat av proffs i ${county.name}`}
                                    width={600}
                                    height={400}
                                    className="rounded-xl shadow-md w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-300"
                                />
                                <figcaption className="text-sm text-gray-500 mt-2 text-center italic">Vi matchar dig med rätt målare i {county.name}</figcaption>
                            </figure>
                        </section>

                        {/* Why Choose Us */}
                        <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Varför välja en målerifirma i {county.name} via Målarna?</h2>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Lokala experter</h3>
                                        <p className="text-gray-600">Firmor med djup kunskap om {seoData.climateText}.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Snabb offert</h3>
                                        <p className="text-gray-600">Jämför priser från flera målerifirmor i {county.name} på nolltid.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Kvalitetsgaranti</h3>
                                        <p className="text-gray-600">Endast firmor med goda omdömen, försäkringar och kollektivavtal.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Full service</h3>
                                        <p className="text-gray-600">Inomhus- och utomhusmålning, tapetsering, epoxymålning med mera.</p>
                                    </div>
                                </li>
                            </ul>
                        </section>

                        {/* Images - Facade */}
                        <section className="grid md:grid-cols-3 gap-4">
                            <figure className="md:col-span-1">
                                <Image
                                    src="/images/lan/exterior-red-house.jpg"
                                    alt={`Fasadmålning av trähus i ${county.name}`}
                                    width={400}
                                    height={500}
                                    className="rounded-xl shadow-md w-full h-48 md:h-64 object-cover hover:scale-[1.02] transition-transform duration-300"
                                />
                                <figcaption className="text-xs text-gray-500 mt-2 text-center">Fasadrenovering</figcaption>
                            </figure>
                            <figure className="md:col-span-1">
                                <Image
                                    src="/images/lan/roof-maintenance.jpg"
                                    alt={`Takmålning och underhåll i ${county.name}`}
                                    width={400}
                                    height={500}
                                    className="rounded-xl shadow-md w-full h-48 md:h-64 object-cover hover:scale-[1.02] transition-transform duration-300"
                                />
                                <figcaption className="text-xs text-gray-500 mt-2 text-center">Takunderhåll</figcaption>
                            </figure>
                            <figure className="md:col-span-1">
                                <Image
                                    src="/images/lan/exterior-green-house.jpg"
                                    alt={`Målade fönster och fasad i ${county.name}`}
                                    width={400}
                                    height={500}
                                    className="rounded-xl shadow-md w-full h-48 md:h-64 object-cover hover:scale-[1.02] transition-transform duration-300"
                                />
                                <figcaption className="text-xs text-gray-500 mt-2 text-center">Detaljmålning</figcaption>
                            </figure>
                        </section>

                        {/* How it works */}
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Så enkelt fungerar det:</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">1</div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Fyll i ditt projekt</h3>
                                        <p className="text-gray-600">Beskriv vad du vill ha hjälp med, t.ex. "måla vardagsrum i {seoData.cities[0] || 'vår stad'}" eller "fasadmålning hus i {seoData.cities[1] || 'länet'}".</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">2</div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Få upp till 4 offerter</h3>
                                        <p className="text-gray-600">Ta emot förslag från verifierade målerifirmor i {county.name} inom kort.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">3</div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Välj bästa erbjudandet</h3>
                                        <p className="text-gray-600">Jämför, välj och boka tid – klart!</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Conclusion */}
                        <section className="bg-blue-600 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                            <div className="relative z-10 text-center">
                                <h2 className="text-2xl font-bold mb-4">Starta ditt projekt idag</h2>
                                <p className="text-blue-100 mb-6 text-lg">
                                    Tusentals nöjda kunder i {county.name} har redan hittat sin målerifirma hos oss. Spara tid och pengar du också!
                                </p>
                                <p className="text-blue-100 mb-8 font-medium">
                                    Begär din gratis offert nu – det tar bara ett par minuter att hitta den perfekta målerifirman i {county.name}!
                                </p>
                                <LeadForm />
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-8">
                        <LeadForm />
                        <TrustpilotWidget />
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-4">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Orter i {county.name}</h3>
                            <ul className="space-y-2 max-h-[600px] overflow-y-auto">
                                {municipalities.map((m) => (
                                    <li key={m.slug}>
                                        <Link
                                            href={`/malerifirma/${county.slug}/${m.slug}`}
                                            className="text-gray-600 hover:text-blue-600 flex justify-between items-center group py-1.5 border-b border-gray-50 last:border-0"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform">{m.name}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
