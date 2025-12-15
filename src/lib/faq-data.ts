
export interface FaqItem {
    question: string;
    answerHTML: string; // Using HTML to allow bolding or paragraphs if needed, though simple text is safer for JSON-LD. Let's stick to text for JSON-LD and maybe simple formatting for UI.
    answerText: string; // Plain text for JSON-LD
}

export const getFaqData = (areaName: string): FaqItem[] => {
    return [
        {
            question: `Hur lång tid tar det att måla ett rum i ${areaName}?`,
            answerText: `Tiden för att måla ett rum i ${areaName} beror på rummets storlek, väggarnas skick samt om tak, lister och snickerier ska målas. Som riktmärke tar ett mindre rum ofta 1–2 arbetsdagar, ett normalstort rum 2–3 arbetsdagar. Krävs spackling, slipning eller flera skikt kan det ta längre. Be om offert för en tidplan anpassad till din bostad i ${areaName}.`,
            answerHTML: `Tiden för att måla ett rum i ${areaName} beror på rummets storlek, väggarnas skick samt om tak, lister och snickerier ska målas. Som riktmärke tar ett mindre rum ofta 1–2 arbetsdagar, ett normalstort rum 2–3 arbetsdagar. Krävs spackling, slipning eller flera skikt kan det ta längre. Be om offert för en tidplan anpassad till din bostad i ${areaName}.`
        },
        {
            question: `Hur lång tid tar det att måla ett hus i ${areaName}?`,
            answerText: `Att måla ett hus i ${areaName} tar vanligtvis 1–4 veckor beroende på husets storlek, fasadtyp, fasadens skick och väder. Mindre villor kan gå på 1–2 veckor medan normalstora ofta tar 2–4 veckor. Arbetet planeras utifrån lokala förhållanden i ${areaName} för bäst hållbarhet.`,
            answerHTML: `Att måla ett hus i ${areaName} tar vanligtvis 1–4 veckor beroende på husets storlek, fasadtyp, fasadens skick och väder. Mindre villor kan gå på 1–2 veckor medan normalstora ofta tar 2–4 veckor. Arbetet planeras utifrån lokala förhållanden i ${areaName} för bäst hållbarhet.`
        },
        {
            question: `Vad kostar det att måla om huset i ${areaName}?`,
            answerText: `Priset för att måla om ett hus i ${areaName} påverkas av fasadens storlek, fasadtyp, underarbete, färgval och behov av ställning/lift. Som riktvärde ligger det ofta från cirka 1 000–2 000 kr per kvm fasad (före ROT). För ett exakt pris rekommenderas en kostnadsfri offert baserad på ditt hus i ${areaName}.`,
            answerHTML: `Priset för att måla om ett hus i ${areaName} påverkas av fasadens storlek, fasadtyp, underarbete, färgval och behov av ställning/lift. Som riktvärde ligger det ofta från cirka 1 000–2 000 kr per kvm fasad (före ROT). För ett exakt pris rekommenderas en kostnadsfri offert baserad på ditt hus i ${areaName}.`
        },
        {
            question: `Vad kostar det att måla om en lägenhet i ${areaName}?`,
            answerText: `Att måla om en lägenhet i ${areaName} kan kosta från cirka 8 000–15 000 kr för en mindre lägenhet och 15 000–30 000 kr för 2–3 rum och kök, beroende på ytor, skick och om tak/snickerier ingår. ROT-avdrag kan ofta nyttjas. Begär offert för en exakt prisbild för din lägenhet i ${areaName}.`,
            answerHTML: `Att måla om en lägenhet i ${areaName} kan kosta från cirka 8 000–15 000 kr för en mindre lägenhet och 15 000–30 000 kr för 2–3 rum och kök, beroende på ytor, skick och om tak/snickerier ingår. ROT-avdrag kan ofta nyttjas. Begär offert för en exakt prisbild för din lägenhet i ${areaName}.`
        },
        {
            question: `Vad kostar det att lackera om köksluckor i ${areaName}?`,
            answerText: `Lackering av köksluckor i ${areaName} är ett prisvärt alternativ till att byta kök. Kostnaden beror på antal luckor, storlek, skick och val av lack, men ligger ofta från cirka 1 200–2 500 kr per lucka. Resultatet blir ett slitstarkt och jämnt ytskikt. Be om offert för ditt kök i ${areaName}.`,
            answerHTML: `Lackering av köksluckor i ${areaName} är ett prisvärt alternativ till att byta kök. Kostnaden beror på antal luckor, storlek, skick och val av lack, men ligger ofta från cirka 1 200–2 500 kr per lucka. Resultatet blir ett slitstarkt och jämnt ytskikt. Be om offert för ditt kök i ${areaName}.`
        },
        {
            question: `Vad kostar det att anlita målare i ${areaName}?`,
            answerText: `Kostnaden för att anlita målare i ${areaName} varierar beroende på uppdragets typ och omfattning. Vanliga riktpriser är 500–700 kr per timme före ROT, och ofta cirka 250–350 kr per timme efter ROT. Fast pris förekommer också vid tydliga projekt som rumsmålning eller fasadmålning.`,
            answerHTML: `Kostnaden för att anlita målare i ${areaName} varierar beroende på uppdragets typ och omfattning. Vanliga riktpriser är 500–700 kr per timme före ROT, och ofta cirka 250–350 kr per timme efter ROT. Fast pris förekommer också vid tydliga projekt som rumsmålning eller fasadmålning.`
        },
        {
            question: `Vad är kostnaden för tapetsering 2025 i ${areaName}?`,
            answerText: `Kostnaden för tapetsering 2025 i ${areaName} påverkas av underlag, tapettyp och mönsterpassning. Som riktvärde ligger tapetsering ofta omkring 250–450 kr per kvm. Svåra underlag eller specialtapeter kan höja priset. Begär offert för exakta kostnaden i din bostad i ${areaName}.`,
            answerHTML: `Kostnaden för tapetsering 2025 i ${areaName} påverkas av underlag, tapettyp och mönsterpassning. Som riktvärde ligger tapetsering ofta omkring 250–450 kr per kvm. Svåra underlag eller specialtapeter kan höja priset. Begär offert för exakta kostnaden i din bostad i ${areaName}.`
        },
        {
            question: `Kan man måla om huset på hösten i ${areaName}?`,
            answerText: `Ja, det går ofta att måla om huset på hösten i ${areaName}, men det kräver rätt förutsättningar. Temperaturen bör normalt vara över +5 °C (och följa färgtillverkarens rekommendationer), och man behöver ta hänsyn till luftfuktighet, torktider och risk för nattfrost. En professionell målare kan bedöma om höstmålning är lämplig för ditt hus i ${areaName}.`,
            answerHTML: `Ja, det går ofta att måla om huset på hösten i ${areaName}, men det kräver rätt förutsättningar. Temperaturen bör normalt vara över +5 °C (och följa färgtillverkarens rekommendationer), och man behöver ta hänsyn till luftfuktighet, torktider och risk för nattfrost. En professionell målare kan bedöma om höstmålning är lämplig för ditt hus i ${areaName}.`
        }
    ];
};
