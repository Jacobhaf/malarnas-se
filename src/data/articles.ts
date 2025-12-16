export interface Article {
    slug: string;
    title: string;
    description: string;
    image: string;
    content: string; // HTML content
}

export const ARTICLES: Article[] = [
    {
        slug: "inomhusmalning",
        title: "Inomhusmålning – guide till ett perfekt resultat",
        description: "Ska du måla om hemma? Här går vi igenom allt du behöver veta om inomhusmålning, från färgval och förarbete till kostnad och varför proffshjälp lönar sig.",
        image: "/images/artiklar/inomhus.png",
        content: `
            <p className="lead">Att måla om inomhus är ett av de mest kostnadseffektiva sätten att förnya sitt hem. Oavsett om det handlar om att ljusa upp ett vardagsrum, ge sovrummet en harmonisk känsla eller fräscha upp en hel lägenhet, så gör rätt färgval och utförande en enorm skillnad. Här guidar vi dig genom processen.</p>

            <h2>Därför är förarbetet avgörande</h2>
            <p>Många lockas av att börja måla direkt, men hemligheten bakom ett proffsigt resultat ligger i förarbetet. Utan noggranna förberedelser kommer slutresultatet att avslöja ojämnheter och skavanker.</p>
            <ul>
                <li><strong>Skyddstäckning:</strong> Golv, lister och möbler måste skyddas noga för att undvika färgstänk.</li>
                <li><strong>Rengöring:</strong> Feta fläckar och damm gör att färgen fäster dåligt. Målartvätt är ofta nödvändigt.</li>
                <li><strong>Spackling och slipning:</strong> Skruvhål, sprickor och skarvar måste spacklas och slipas för att ytan ska bli helt slät.</li>
            </ul>

            <h2>Välja rätt färg och glans</h2>
            <p>Valet av kulör är viktigt, men glansgraden spelar också stor roll för både utseende och funktion.</p>
            <ul>
                <li><strong>Matt färg (Glans 3-5):</strong> Vanligt i tak och ofta på väggar i vardagsrum och sovrum. Ger ett lugnt intryck och döljer ojämnheter bra, men är känsligare för avtorkning.</li>
                <li><strong>Halvmatt/Silkesmatt (Glans 7-20):</strong> Standard för väggar i kök, hall och barnrum. Tål avtorkning bättre.</li>
                <li><strong>Halvblank/Blank (Glans 40+):</strong> Används oftast till snickerier, lister och våtrum för maximal slittålighet och fuktskydd.</li>
            </ul>

            <h2>Vad kostar det att anlita en målare?</h2>
            <p>Priset för inomhusmålning varierar beroende på ytans storlek, takhöjd, antal snickerier och hur mycket förarbete som krävs. Generellt kan du räkna med ett timpris på cirka 500–700 kr innan ROT-avdrag. Kom ihåg att ROT-avdraget ger dig 30% avdrag på arbetskostnaden, vilket gör det mycket prisvärt att anlita hjälp.</p>

            <h3>Fördelar med professionell hjälp</h3>
            <p>Att anlita en målerifirma handlar inte bara om att spara tid. Det handlar om trygghet.</p>
            <ul>
                <li><strong>Fackmannamässigt utförande:</strong> Raka linjer, jämna ytor och inga rinnande droppar.</li>
                <li><strong>Effektivitet:</strong> Proffs arbetar snabbt och strukturerat.</li>
                <li><strong>Garanti:</strong> Seriösa målare lämnar garanti på sitt arbete.</li>
            </ul>

            <h2>Checklista inför offerförfrågan</h2>
            <p>När du begär offerter via Målarnas.se, försök att vara så tydlig som möjligt:</p>
            <ul>
                <li>Hur stor är ytan (kvadratmeter golvyta)?</li>
                <li>Ingår takmålning?</li>
                <li>Ska lister, dörrar eller element målas?</li>
                <li>Hur är skicket idag? Behövs mycket spackling eller tapetnedtagning?</li>
            </ul>
        `
    },
    {
        slug: "fasadmalning",
        title: "Fasadmålning – skydda huset och höj värdet",
        description: "Fasadmålning är husets viktigaste underhåll. Läs om olika färgtyper, när det är dags att måla om och hur du säkerställer att fasaden håller i många år.",
        image: "/images/artiklar/fasad.png",
        content: `
            <p className="lead">En nymålad fasad är vacker att se på, men det primära syftet med fasadmålning är skydd. Sol, vind, regn och kyla sliter hårt på huset året runt. Att måla om i tid är en investering som förebygger dyra skador som fukt och röta.</p>

            <h2>Hitta rätt färgtyp till ditt hus</h2>
            <p>Att välja rätt färgtyp är kritiskt. Du bör i regel fortsätta med samma typ av färg som huset tidigare målats med för att undvika problem.</p>
            <ul>
                <li><strong>Akrylatfärg (Plastfärg):</strong> Mycket vanlig idag. Håller kulören bra, torkar snabbt och kräver lite underhåll. Bildar en tät yta.</li>
                <li><strong>Oljefärg/Alkydfärg:</strong> Tränger in bra i träet och ger en blankare yta som mattas med tiden. Bra skydd mot fukt.</li>
                <li><strong>Slamfärg (t.ex. Falu Rödfärg):</strong> Klassisk svensk färg som låter träet andas. Kan endast målas på sågat virke eller ytor tidigare målade med slamfärg.</li>
                <li><strong>Linoljefärg:</strong> Traditionell färg som tränger djupt in. Kräver mer arbetstid och torktid men åldras vackert.</li>
            </ul>

            <h2>När ska man måla fasaden?</h2>
            <p>Den bästa tiden för utomhusmålning är oftast sen vår, sommar och tidig höst. Du vill ha torrt väder och en dygnstemperatur som inte understiger 7–10 grader. Undvik att måla i direkt starkt solsken då färgen kan torka för snabbt och få blåsor.</p>

            <h2>Steg för steg: Så gör proffsen</h2>
            <ol>
                <li><strong>Besiktning:</strong> Kontroll av fasadens skick. Finns det ruttet trä som måste bytas?</li>
                <li><strong>Tvättning:</strong> Fasadtvätt är obligatoriskt för att få bort smuts, alger och mögelsporer.</li>
                <li><strong>Skrapning och slipning:</strong> Lös färg skrapas bort för att den nya färgen ska fästa.</li>
                <li><strong>Grundolja och grundfärg:</strong> Speciellt viktigt på ändträ och trärena ytor.</li>
                <li><strong>Målning:</strong> Oftast två strykningar för fullgott skydd och täckning.</li>
            </ol>

            <h2>Vad kostar fasadmålning?</h2>
            <p>Kostnaden varierar stort beroende på husets storlek, behov av ställning eller skylift, samt fasadens skick. Det är ofta ett större projekt som tar en till två veckor för en villa. Kom ihåg att nyttja ROT-avdraget för att dra av 30% av arbetskostnaden.</p>

            <p><strong>Tips:</strong> Var ute i god tid! Duktiga målare blir ofta uppbokade snabbt inför sommarsäsongen.</p>
        `
    },
    {
        slug: "tapetsering",
        title: "Tapetsering – skapa karaktär och personlighet",
        description: "Tapeter kan förändra ett rum helt. Lär dig om mönsterpassning, olika tapetkvaliteter och varför underarbetet är nyckeln till ett bubbelfritt resultat.",
        image: "/images/artiklar/tapetsering.png",
        content: `
            <p className="lead">Med tapeter kan du skapa en atmosfär som färg sällan kan matcha. Från djärva mönster till diskreta strukturer – möjligheterna är oändliga. Men tapetsering kräver tålamod, precision och kunskap för att resultatet ska bli perfekt.</p>

            <h2>Non-woven, papper eller vinyl?</h2>
            <p>Det finns olika typer av tapeter med olika egenskaper:</p>
            <ul>
                <li><strong>Non-woven (EasyUp):</strong> De flesta moderna tapeter är av denna typ. De är formstabila, enkla att sätta upp (limma direkt på väggen) och kräver ingen blötläggning.</li>
                <li><strong>Papperstapet:</strong> Klassisk variant som ska förlimmas på baksidan och svälla innan uppsättning. Kräver mer teknik.</li>
                <li><strong>Vinyltapet:</strong> Tålig och avtorkningsbar yta, perfekt för kök eller hall.</li>
                <li><strong>Fototapet:</strong> Stora motiv som kräver exakt passning för att bilden ska bli hel.</li>
            </ul>

            <h2>Hemligheten är en slät vägg</h2>
            <p>En snygg tapet kan inte dölja en ful vägg. Tvärtom syns ojämnheter ofta igenom.</p>
            <ul>
                <li><strong>Ta bort gammal tapet:</strong> Om det sitter flera lager gammal tapet bör dessa ofta tas ner eller ångas bort.</li>
                <li><strong>Bredspackling:</strong> På ojämna väggar, eller väggar med strukturtapet (t.ex. glasfiberväv), krävs ofta bredspackling för att få en helt slät yta.</li>
                <li><strong>Grundmålning:</strong> Att grundmåla väggen innan tapetsering förhindrar att underlaget lyser igenom och gör att tapeten fäster bättre (samt blir enklare att ta ner i framtiden).</li>
            </ul>

            <h2>Mönsterpassning – en konst</h2>
            <p>Att sätta upp en enfärgad tapet är en sak. Att mönsterpassa en stormönstrad tapet över en hel vägg, runt hörn och vid fönster är betydligt svårare. Ett vanligt misstag vid gör-det-själv-arbete är att man inte räknar med spill vid mönsterpassning och står där med för lite tapet, eller att mönstret hamnar snett.</p>

            <h2>Varför anlita proffs för tapetsering?</h2>
            <p>En yrkesmålare ser till att våderna sitter rakt, att skarvarna blir osynliga (kant-i-kant) och att mönstret flödar perfekt genom rummet. Dessutom går arbetet snabbt. Du slipper kladd med lim, bubblor och veck.</p>
        `
    },
    {
        slug: "snickerimalning",
        title: "Snickerimålning – detaljerna som gör helheten",
        description: "Fräscha upp köksluckor, lister eller dörrar? Snickerimålning är ett hantverk som kräver noggrannhet. Läs om sprutlackering vs penselmålning här.",
        image: "/images/artiklar/snickerimalning.png",
        content: `
            <p className="lead">Lister, dörrfoder, fönsterbrädor, köksluckor och garderober. Snickerierna är hemmets "ramverk". När dessa är slitna eller gulnade drar de ner intrycket av hela rummet, oavsett hur fina väggarna är. Nymålade snickerier ger en omedelbar känsla av nytt och fräscht.</p>

            <h2>Penselmålning eller sprutlackering?</h2>
            <p>Det finns två huvudsakliga metoder för snickerimålning:</p>
            <h3>1. Pensel- och rullmålning på plats</h3>
            <p>Detta är vanligast för fasta snickerier som lister, karmar, trappor och fönster som inte kan monteras ner. En duktig målare använder penslar av hög kvalitet för att minimera penseldrag och få den där "flytande" ytan.</p>

            <h3>2. Sprutlackering</h3>
            <p>För lösa delar som köksluckor, lådfronter och innerdörrar är sprutlackering i verkstad oftast överlägset. Resultatet blir en helt slät, fabriksliknande finish som är extremt hållbar.</p>

            <h2>Utmaningar med snickerimålning</h2>
            <p>Snickerifärg är ofta blankare (halvblank/blank) än väggfärg, vilket gör att minsta dammkorn eller ojämnhet syns tydligare. Färgen har också andra egenskaper och kan vara svårare att stryka ut jämnt utan att den rinner.</p>
            <ul>
                <li><strong>Slipning:</strong> Ytan måste mattas ner ordentligt för att färgen ska bita.</li>
                <li><strong>Kvistlack:</strong> På nytt trä måste kvistar lackas (ofta 2 gånger) för att inte kåda ska blöda igenom och ge gula fläckar.</li>
                <li><strong>Mellanslipning:</strong> Proffs slipar ofta lätt mellan strykningarna för att få bort "resning" i träet och damm.</li>
            </ul>

            <h2>Renovera köket med färg</h2>
            <p>Att lackera om köksluckorna är ett smart och miljövänligt alternativ till att byta ut hela köket. Det kostar en bråkdel av priset för ett nytt kök men ger känslan av en totalrenovering. Kombinera med nya handtag och nymålade väggar så har du ett "nytt" kök på en vecka.</p>

            <h2>Vi hjälper dig hitta rätt expertis</h2>
            <p>Oavsett om du behöver precisionsmålning av stuckatur och lister, eller lackering av en hel köksinredning, hjälper Målarnas.se dig att hitta specialister på snickerimålning i ditt område.</p>
        `
    }
];

export function getArticle(slug: string): Article | undefined {
    return ARTICLES.find(a => a.slug === slug);
}
