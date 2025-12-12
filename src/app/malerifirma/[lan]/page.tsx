
import Breadcrumbs from "@/components/Breadcrumbs";
import MunicipalityList from "@/components/MunicipalityList";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getCounties, getCountyBySlug, getMunicipalitiesByCounty, getLocations } from "@/lib/data";
import { slufigy } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const counties = getCounties();
    return counties.map((county) => ({
        lan: slufigy(county),
    }));
}

export async function generateMetadata({ params }: { params: { lan: string } }): Promise<Metadata> {
    const countyName = getCountyBySlug(params.lan);
    if (!countyName) return { title: 'Län hittades inte' };

    return {
        title: `Målarfirmor i ${countyName} - Jämför priser & omdömen`,
        description: `Hitta bästa målerifirman i ${countyName}. Jämför offerter från lokala målare och spara pengar på ditt måleriprojekt. Certifierade företag med bra omdömen.`,
    };
}

export default function CountyPage({ params }: { params: { lan: string } }) {
    const countyName = getCountyBySlug(params.lan);

    if (!countyName) {
        notFound();
    }

    const municipalities = getMunicipalitiesByCounty(countyName);

    // SEO Schema
    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `Målarfirmor i ${countyName}`,
        "description": `Hitta lokala målare i ${countyName}.`,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": municipalities.map((m, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://malarnas.se/malerifirma/${params.lan}/${slufigy(m.kommun)}`,
                "name": m.kommun
            }))
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs
                items={[
                    { label: `Målerifirma ${countyName}`, url: `/malerifirma/${params.lan}` }
                ]}
            />
            <SchemaMarkup schema={schema} />

            <h1 className="text-4xl font-bold text-gray-900 mb-6">Målarfirmor i {countyName}</h1>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
                <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                    Här listar vi alla kommuner i {countyName} där vi har anslutna måleriföretag. Klicka på din kommun för att se lokala firmor, läsa omdömen och begära offerter. Vi hjälper dig att hitta rätt målare för allt från fasadmålning till invändiga renoveringar.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Välj kommun</h2>
                <MunicipalityList municipalities={municipalities} countySlug={params.lan} />
            </div>

            <div className="prose max-w-none text-gray-600 bg-gray-50 p-8 rounded-2xl">
                <h2>Att anlita målare i {countyName}</h2>
                <p>
                    I {countyName} finns det många skickliga hantverkare att välja mellan. Oavsett om du bor i en tätort eller på landsbygden kan du hitta professionell hjälp för ditt projekt. Tänk på att vara ute i god tid, särskilt under vår och sommar då många vill måla om fasaden.
                </p>
                <p>
                    Genom att jämföra flera företag i {countyName} kan du säkerställa att du får ett konkurrenskraftigt pris och villkor som passar dig. Glöm inte att kontrollera att företaget har F-skattsedel, vilket är ett krav för att du ska kunna nyttja ROT-avdraget.
                </p>
            </div>
        </div>
    );
}
