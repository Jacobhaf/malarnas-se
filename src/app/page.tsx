import CountyAccordion from "@/components/CountyAccordion";
import { getLocations } from "@/lib/data";
import { getMunicipalityPaths } from "@/lib/company-data";
import TrustpilotWidget from "@/components/TrustpilotWidget";
import HeroCTA from "@/components/HeroCTA";
import { CheckCircle2, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const locations = getLocations();
  const activeSlugs = getMunicipalityPaths();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#102a43] text-white pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-[#102a43] to-gray-900 opacity-95 z-0"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-blue-100 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Nyhet: ROT-avdraget höjs till 50% under 2025
          </div>

          {/* Headlines */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-110 animate-in zoom-in-95 duration-700 delay-100">
            Få upp till 5 offerter från <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">granskade målare</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-700 delay-150">
            Skapa en kostnadsfri förfrågan på några minuter. Vi matchar dig med kvalitetssäkrade målerifirmor i ditt område.
          </p>

          {/* Value Props Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm md:text-base font-medium text-blue-100 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <CheckCircle2 className="text-green-400 w-5 h-5" />
              Kostnadsfritt
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <CheckCircle2 className="text-green-400 w-5 h-5" />
              Inga köpkrav
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <CheckCircle2 className="text-green-400 w-5 h-5" />
              Tryggt & säkert
            </div>
          </div>

          {/* CTA Buttons */}
          <HeroCTA />

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-80">
            <TrustpilotWidget />
          </div>
        </div>
      </section>

      {/* Intro / Vision Section */}
      <section className="py-20 lg:py-28 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-green-50 rounded-2xl transform rotate-2"></div>
                <Image
                  src="/images/lan/interior-living-room.png"
                  alt="Målare som målar vardagsrum"
                  width={600}
                  height={500}
                  className="relative rounded-2xl shadow-xl w-full object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-xs animate-bounce-slow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-full text-green-600">
                      <ShieldCheck size={24} />
                    </div>
                    <span className="font-bold text-gray-900">Granskade företag</span>
                  </div>
                  <p className="text-sm text-gray-500">Vi kontrollerar F-skatt, skulder och omdömen.</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Vår vision: <span className="text-blue-600">Trygghet</span> genom hela processen
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Målarnas.se skapades ur en vilja att förenkla. Att anlita hantverkare ska inte vara krångligt eller osäkert. Vi vill vara din trygga hamn där komplexa beslut omvandlas till enkla val.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Oavsett om du ska måla om fasaden, tapetsera hallen eller fräscha upp köksluckorna, hjälper vi dig att hitta rätt kompetens till rätt pris. Vårt mål är att du ska känna dig 100% trygg med ditt val av målerifirma.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">50 000+</div>
                  <div className="text-sm text-gray-500 font-medium">Förmedlade offerter</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">4.8/5</div>
                  <div className="text-sm text-gray-500 font-medium">Snittbetyg</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works (Process) */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Hur fungerar det?</h2>
            <p className="text-xl text-gray-600">
              Vår tjänst är utformad för att vara så enkel och effektiv som möjligt. Från idé till offert på några minuter.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relaltive">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-[var(--y-center)] left-0 w-full h-1 bg-blue-100 -z-10"></div>

            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 relative group">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-200">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Beskriv ditt uppdrag</h3>
              <p className="text-gray-600 leading-relaxed">
                Fyll i vårt enkla formulär. Berätta vad du behöver hjälp med, var du bor och när du vill ha jobbet utfört. Det tar knappt 2 minuter.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 relative group">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-200">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Få offerter</h3>
              <p className="text-gray-600 leading-relaxed">
                Vi matchar din förfrågan med kontrollerade målerifirmor i ditt område. Du får svar och prisförslag från upp till 5 intresserade företag.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 relative group">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-200">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Jämför & välj</h3>
              <p className="text-gray-600 leading-relaxed">
                Jämför företagens offerter, omdömen och referenser i lugn och ro. Välj den målare som passar dig bäst – eller ingen alls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Vad behöver du hjälp med?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vi förmedlar kontakter för alla typer av måleriarbeten. Stora som små.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Inomhusmålning", img: "/images/lan/interior-living-room.png", desc: "Väggar, tak och golv." },
              { title: "Fasadmålning", img: "/images/lan/exterior-red-house.jpg", desc: "Skydda huset & ge det nytt liv." },
              { title: "Tapetsering", img: "/images/lan/interior-green-room.png", desc: "Mönsterpassning & väv." },
              { title: "Snickerimålning", img: "/images/lan/interior-living-room.png", desc: "Kök, dörrar och fönster." } // Reusing img for now
            ].map((service, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all h-80">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                  <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counties Section */}
      <section id="counties" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Vi finns i hela Sverige</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oavsett var du bor kan vi hjälpa dig hitta lokala målare. Välj ditt län nedan för att komma vidare.
            </p>
          </div>
          <CountyAccordion locations={locations} activeSlugs={activeSlugs} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#102a43] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Redo att starta ditt projekt?</h2>
          <p className="text-xl text-blue-200 mb-10">
            Det kostar ingenting att fråga. Skicka in din beskrivning nu och få svar inom 24 timmar.
          </p>
          <HeroCTA />
        </div>
      </section>
    </div>
  );
}
