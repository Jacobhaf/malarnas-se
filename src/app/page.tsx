import CountyAccordion from "@/components/CountyAccordion";
import { getLocations } from "@/lib/data";
import { getMunicipalityPaths } from "@/lib/company-data";
import Image from "next/image";
import Link from "next/link";
import TrustpilotWidget from "@/components/TrustpilotWidget";

export default function Home() {
  const locations = getLocations();
  const activeSlugs = getMunicipalityPaths();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1e40af] text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-90 z-0"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            Jämför målarfirmor <br className="hidden md:block" />& få offert inom 24h
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Hitta certifierade och lokala målare för ditt projekt. Enkelt, tryggt och helt kostnadsfritt.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              href="#counties"
              className="bg-[#22c55e] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-transform hover:scale-105 shadow-lg"
            >
              Hitta målare nära dig
            </Link>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full py-4 px-8 text-white font-medium flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Över 1 000 anslutna företag
            </div>
          </div>

          <div className="flex justify-center">
            <TrustpilotWidget />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Välj din plats</h3>
              <p className="text-gray-600">Välj ditt län och kommun för att se tillgängliga målarfirmor i ditt område.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Jämför företag</h3>
              <p className="text-gray-600">Se omdömen, referenser och certifikat för att hitta rätt målare för jobbet.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Få offerter</h3>
              <p className="text-gray-600">Kontakta företagen direkt och begär offerter för ditt måleriprojekt.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Counties Section with Accordion */}
      <section id="counties" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Hitta målare i ditt län</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vi har samlat Sveriges bästa målerifirmor. Klicka på ditt län för att hitta din kommun.
            </p>
          </div>
          <CountyAccordion locations={locations} activeSlugs={activeSlugs} />
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 prose prose-blue max-w-4xl mx-auto">
          <h2 className="text-center">Därför ska du jämföra målarfirmor</h2>
          <p>
            Att anlita en professionell målare är en investering i ditt hem. Oavsett om det handlar om fasadmålning, tapetsering eller målning av snickerier, är det viktigt att hitta rätt kompetens till rätt pris.
          </p>
          <p>
            Genom Målarnas.se kan du enkelt navigera bland lokala företag, läsa om deras tjänster och hitta kontaktuppgifter. Vi strävar efter att göra processen så smidig som möjligt för dig som beställare.
          </p>
          <h3>ROT-avdrag för måleriarbeten</h3>
          <p>
            Kom ihåg att du som privatperson ofta har rätt till ROT-avdrag för arbetskostnaden vid måleritjänster. Detta innebär att du kan dra av 30% av arbetskostnaden direkt på fakturan. Många av de företag vi listar är vana vid att hantera ROT-avdrag direkt åt dig.
          </p>
        </div>
      </section>
    </div>


  );
}
