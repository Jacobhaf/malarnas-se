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
        title: "Inomhusmålning – ge ditt hem nytt liv med professionell målning",
        description: "Att måla om inomhus är ett av de mest effektiva sätten att förnya ett hem. Rätt färg, korrekt utfört arbete och noggranna förberedelser kan göra enorm skillnad.",
        image: "/images/artiklar/inomhus.png",
        content: `
            <p>Att måla om inomhus är ett av de mest effektiva sätten att förnya ett hem. Rätt färg, korrekt utfört arbete och noggranna förberedelser kan göra enorm skillnad för både känsla och helhetsintryck. Oavsett om det gäller en hel lägenhet, ett enskilt rum eller mindre detaljer är professionell inomhusmålning en investering som lönar sig.</p>

            <h3>Vad ingår i inomhusmålning?</h3>
            <p>Inomhusmålning är mer än att bara applicera färg på väggarna. Ett väl utfört arbete inkluderar bland annat:</p>
            <ul>
                <li>Skydd av golv, möbler och ytor</li>
                <li>Spackling av hål och ojämnheter</li>
                <li>Slipning för slät finish</li>
                <li>Grundmålning vid behov</li>
                <li>Slutmålning med rätt teknik och färgval</li>
            </ul>
            <p>Det är just förarbetet som avgör slutresultatet – och som ofta underskattas vid egen målning.</p>

            <h3>Fördelar med att anlita professionell målare</h3>
            <p>Att anlita en erfaren målare sparar både tid och frustration. Du får:</p>
            <ul>
                <li>Ett jämnt och hållbart resultat</li>
                <li>Rätt färgtyp för rätt rum</li>
                <li>Effektiv arbetsprocess</li>
                <li>Mindre spill och kladd</li>
                <li>Garanti på arbetet</li>
            </ul>
            <p>Professionella målare vet hur olika underlag beter sig och hur ljus påverkar färgval – något som är svårt att läsa sig till.</p>

            <h3>Vanliga rum som målas om</h3>
            <p>Inomhusmålning är vanligt i:</p>
            <ul>
                <li><strong>Vardagsrum</strong> – för ett fräscht och inbjudande helhetsintryck</li>
                <li><strong>Sovrum</strong> – lugna färger för bättre trivsel</li>
                <li><strong>Kök</strong> – färger som tål fukt och slitage</li>
                <li><strong>Hall</strong> – slitstarka ytor som håller över tid</li>
            </ul>

            <h3>Vad kostar inomhusmålning?</h3>
            <p>Priset på inomhusmålning beror på flera faktorer:</p>
            <ul>
                <li>Ytans storlek</li>
                <li>Skick på väggar och tak</li>
                <li>Färgtyp och kulör</li>
                <li>Antal lager</li>
                <li>Om ROT-avdrag används</li>
            </ul>
            <p>För bästa pris är det klokt att jämföra offerter från flera målare.</p>

            <h3>Tips innan du målar om</h3>
            <ul>
                <li>Provstryk alltid färgen</li>
                <li>Tänk på hur dagsljus påverkar kulören</li>
                <li>Planera arbetet rum för rum</li>
                <li>Se till att offerten är tydlig</li>
            </ul>

            <h3>Vill du komma igång?</h3>
            <p>Genom att jämföra offerter från erfarna målare får du rätt pris och tryggt resultat – utan överraskningar.</p>
        `
    },
    {
        slug: "fasadmalning",
        title: "Fasadmålning – skydda huset och höj värdet",
        description: "En välmålad fasad handlar inte bara om utseende. Det skyddar huset mot väder, fukt och slitage samtidigt som fastighetens värde bevaras.",
        image: "/images/artiklar/fasad.png",
        content: `
            <p>Fasadmålning handlar inte bara om utseende. En välmålad fasad skyddar huset mot väder, fukt och slitage samtidigt som fastighetens värde bevaras. I det svenska klimatet är rätt utförd fasadmålning avgörande för husets livslängd.</p>

            <h3>Varför är fasadmålning så viktigt?</h3>
            <p>Med tiden bryts färg och trä ner av sol, regn och temperaturväxlingar. Utan regelbundet underhåll riskerar fasaden sprickor, röta och fuktskador – problem som snabbt blir kostsamma.</p>

            <h3>Olika typer av fasader</h3>
            <ul>
                <li><strong>Träfasad</strong> – kräver regelbundet underhåll och rätt färgtyp</li>
                <li><strong>Putsfasad</strong> – känslig för sprickor och fukt</li>
                <li><strong>Tegelfasad</strong> – målas mer sällan men kräver korrekt behandling</li>
            </ul>
            <p>Varje fasadtyp har sina egna krav när det gäller förarbete och färgval.</p>

            <h3>Hur ofta behöver man måla om fasaden?</h3>
            <p>Generellt gäller följande intervaller:</p>
            <ul>
                <li>Träfasad: var 8–12 år</li>
                <li>Putsfasad: var 12–20 år</li>
                <li>Obehandlade ytor kan behöva åtgärdas oftare</li>
            </ul>
            <p>Placering, väderstreck och tidigare färgval påverkar intervallen.</p>

            <h3>Arbetsprocess vid fasadmålning</h3>
            <ul>
                <li>Tvätt och rengöring</li>
                <li>Skrapning och slipning</li>
                <li>Grundmålning</li>
                <li>Slutmålning i rätt väderförhållanden</li>
            </ul>
            <p>Noggrannhet i varje steg är avgörande för ett hållbart resultat.</p>

            <h3>Kostnad och ROT-avdrag</h3>
            <p>Priset på fasadmålning beror på:</p>
            <ul>
                <li>Husets storlek</li>
                <li>Fasadmateriel</li>
                <li>Tillgänglighet (ställning/lift)</li>
                <li>Arbetsinsats</li>
            </ul>
            <p>ROT-avdraget kan sänka arbetskostnaden avsevärt.</p>

            <h3>Jämför offerter innan du bestämmer dig</h3>
            <p>Att ta in flera offerter ger bättre pris, tydligare villkor och tryggare val av målare.</p>
        `
    },
    {
        slug: "tapetsering",
        title: "Tapetsering – skapa karaktär och personlighet i hemmet",
        description: "Tapetsering är ett effektivt sätt att ge ett rum helt ny känsla. Skapa allt från diskret elegans till tydliga uttryck med professionell hjälp.",
        image: "/images/artiklar/tapetsering.png",
        content: `
            <p>Tapetsering är ett effektivt sätt att ge ett rum helt ny känsla. Med dagens stora utbud av tapeter kan du skapa allt från diskret elegans till tydliga uttryck. Med professionell tapetsering blir resultatet snyggt, hållbart och exakt.</p>

            <h3>Olika typer av tapeter</h3>
            <ul>
                <li>Papperstapet</li>
                <li>Non-woven (easy-up)</li>
                <li>Vinyl</li>
                <li>Fototapet</li>
                <li>Textiltapet</li>
            </ul>
            <p>Varje typ kräver sin teknik och sitt underlag.</p>

            <h3>Varför anlita en tapetserare?</h3>
            <p>Tapetsering kräver precision. Minsta snedhet syns direkt, särskilt vid mönsterpassning. En professionell tapetserare säkerställer:</p>
            <ul>
                <li>Perfekta skarvar</li>
                <li>Rakt mönster</li>
                <li>Slätt slutresultat</li>
                <li>Tidsbesparing</li>
            </ul>

            <h3>Förberedelser inför tapetsering</h3>
            <ul>
                <li>Gamla tapeter tas bort</li>
                <li>Väggar spacklas och slipas</li>
                <li>Underlaget grundas vid behov</li>
            </ul>
            <p>Ett bra underarbete är helt avgörande.</p>

            <h3>Vad kostar tapetsering?</h3>
            <p>Priset påverkas av:</p>
            <ul>
                <li>Tapettyp</li>
                <li>Väggarnas skick</li>
                <li>Mönsterpassning</li>
                <li>Antal kvadratmeter</li>
            </ul>
            <p>Genom att jämföra offerter får du rätt pris och rätt hantverkare.</p>

            <h3>Vill du ha ett perfekt resultat?</h3>
            <p>Låt en erfaren tapetserare göra jobbet – och slipp frustration och sneda våder.</p>
        `
    },
    {
        slug: "snickerimalning",
        title: "Snickerimålning – detaljerna som gör skillnad",
        description: "Snickerimålning omfattar målning av lister, dörrar, fönster och köksluckor. Det är detaljerna som avgör om ett rum känns genomarbetat.",
        image: "/images/artiklar/snickerimalning.png",
        content: `
            <p>Snickerimålning omfattar målning av lister, dörrar, fönster, trappräcken och köksluckor. Det är ofta dessa detaljer som avgör om ett rum känns genomarbetat eller inte. Snickerimålning kräver precision, rätt färg och rätt teknik.</p>

            <h3>Vad räknas som snickerier?</h3>
            <ul>
                <li>Golv- och taklister</li>
                <li>Dörrar och karmar</li>
                <li>Fönsterbågar</li>
                <li>Köksluckor</li>
                <li>Garderobsdörrar</li>
            </ul>

            <h3>Varför är snickerimålning extra krävande?</h3>
            <p>Till skillnad från väggar syns minsta ojämnhet direkt. Penseldrag, rinningar eller damm i färgen försämrar helhetsintrycket.</p>

            <h3>Arbetsprocess vid snickerimålning</h3>
            <ul>
                <li>Noggrann rengöring</li>
                <li>Slipning</li>
                <li>Grundmålning</li>
                <li>Mellanslipning</li>
                <li>Slutmålning med rätt glans</li>
            </ul>
            <p>Professionella målare använder ofta sprutlackering eller specialpenslar för bästa finish.</p>

            <h3>Kostnad och tidsåtgång</h3>
            <p>Priset beror på:</p>
            <ul>
                <li>Antal snickerier</li>
                <li>Skick och tidigare behandling</li>
                <li>Färgtyp och glansgrad</li>
            </ul>
            <p>Att måla snickerier själv är tidskrävande – proffs gör det snabbare och snyggare.</p>

            <h3>Ett hem som känns nytt</h3>
            <p>Med professionell snickerimålning lyfts hela bostaden, utan att du behöver renovera stort.</p>
        `
    }
];

export function getArticle(slug: string): Article | undefined {
    return ARTICLES.find(a => a.slug === slug);
}
