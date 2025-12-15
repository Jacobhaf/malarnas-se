import { ALL_COMPANIES_RAW } from "@/data/index";
import { RAW_LOCATIONS } from "@/data/raw-locations";
import { slufigy as slugify } from "@/lib/utils";

export interface Company {
    name: string;
    orgNr: string;
    type: string;
    address: string;
    zip: string;
    city: string;
    phone: string;
    fax: string;
    website: string;
    email: string;
    regDate: string;
}

export interface ExtendedCompany extends Company {
    municipalitySlug: string;
    companySlug: string;
    county: string;
    countySlug: string;
}

// Manual overrides for Cities -> Municipalities
// This helps map postal towns (e.g. Sveg) to their administrative Municipality (e.g. Härjedalen)
const CITY_TO_MUNICIPALITY_OVERRIDES: Record<string, string> = {
    // City (Lower case) -> Municipality (Case sensitive, matching RAW_LOCATIONS)
    "sveg": "Härjedalen",
    "funäsdalen": "Härjedalen",
    "hede": "Härjedalen",
    "vemtsalen": "Härjedalen",
    "åkersberga": "Österåker",
    "handen": "Haninge",
    "tumba": "Botkyrka", // or Salem, splits differ, usually Botkyrka for main parts
    "märsta": "Sigtuna",
    "gustavsberg": "Värmdö",
    "kungsängen": "Upplands-Bro",
    "bro": "Upplands-Bro",
    "jakobsberg": "Järfälla",
    "viksjö": "Järfälla",
    "kallhäll": "Järfälla",
    "sollentuna": "Sollentuna", // Usually matches, but explicit safety
    "häggvik": "Sollentuna",
    "edsberg": "Sollentuna",
    "rotebro": "Sollentuna",
    "djursholm": "Danderyd",
    "enebyberg": "Danderyd",
    "stocksund": "Danderyd",
    "täby": "Täby",
    "enskede": "Stockholm",
    "enskededalen": "Stockholm",
    "enskede gård": "Stockholm",
    "johanneshov": "Stockholm",
    "årsta": "Stockholm",
    "älvsjö": "Stockholm",
    "farsta": "Stockholm",
    "hagersten": "Stockholm",
    "hägersten": "Stockholm",
    "skärholmen": "Stockholm",
    "segeltorp": "Huddinge", // Or Stockholm? Usually Huddinge
    "trångsund": "Huddinge",
    "skogås": "Huddinge",
    "tullinge": "Botkyrka",
    "norsborg": "Botkyrka",
    "saltsjö-boo": "Nacka",
    "saltsjöbaden": "Nacka",
    "älta": "Nacka",
    "västerhaninge": "Haninge",
    "jordbro": "Haninge",
    "brandbergen": "Haninge",
    "vendelsö": "Haninge",
    "tungelsta": "Haninge",
    "kista": "Stockholm",
    "spånga": "Stockholm",
    "vällingby": "Stockholm",
    "hässelby": "Stockholm",
    "bromma": "Stockholm",
    "kungsholmen": "Stockholm",
    "södermalm": "Stockholm",
    "norrmalm": "Stockholm",
    "östermalm": "Stockholm",
    "vasastan": "Stockholm",
    "solna": "Solna",
    "sundbyberg": "Sundbyberg",
    "lidingö": "Lidingö",
    "bohus": "Ale", // Ale municipality
    "nödinge": "Ale",
    "surte": "Ale",
    "alafors": "Ale",
    "älvängen": "Ale",
    "hisings backa": "Göteborg",
    "hisings kärra": "Göteborg",
    "västra frölunda": "Göteborg",
    "torslanda": "Göteborg",
    "billdal": "Göteborg",
    "hovås": "Göteborg",
    "askim": "Göteborg",
    "angered": "Göteborg",
    "partille": "Partille",
    "sävedalen": "Partille",
    "juhnsered": "Partille",
    "mölndal": "Mölndal",
    "lindome": "Mölndal",
    "kållered": "Mölndal",
    "härryda": "Härryda",
    "landvetter": "Härryda",
    "mölnlycke": "Härryda",
    "kungälv": "Kungälv",
    "ytterby": "Kungälv",
    "kode": "Kungälv",
    "kärna": "Kungälv",
    "limhamn": "Malmö",
    "bunkeflostrand": "Malmö",
    "tygelsjö": "Malmö",
    "oxie": "Malmö",
    "hjärup": "Staffanstorp",
    "staffanstorp": "Staffanstorp",
    "lomma": "Lomma",
    "bjärred": "Lomma",
    "åkarp": "Burlöv",
    "arlöv": "Burlöv",
    "svedala": "Svedala",
    "bara": "Svedala",
    "vellinge": "Vellinge",
    "höllviken": "Vellinge",
    "skanör": "Vellinge",
    "falsterbo": "Vellinge",
    "trelleborg": "Trelleborg",
    "anderslöv": "Trelleborg",
    "smygehamn": "Trelleborg"
}

// Map cache for locations
let locationMap: Map<string, string> | null = null;
const getLocationMap = () => {
    if (locationMap) return locationMap;
    locationMap = new Map();
    const lines = RAW_LOCATIONS.split('\n');
    lines.forEach(line => {
        const parts = line.split('\t');
        if (parts.length >= 3) {
            const city = parts[0].trim();
            const county = parts[2].trim();
            locationMap!.set(city.toLowerCase(), county);
        }
    });

    // Manual overrides or fixes if needed can go here
    return locationMap!;
};

// New function to get all municipalities from raw data (for static paths and SEO)
export const getAllMunicipalitiesFromRaw = (): { name: string, slug: string, county: string, countySlug: string, population: string }[] => {
    const lines = RAW_LOCATIONS.split('\n');
    const municipalities: { name: string, slug: string, county: string, countySlug: string, population: string }[] = [];

    lines.forEach(line => {
        const parts = line.split('\t');
        if (parts.length >= 3) {
            const name = parts[0].trim();
            const population = parts[1].trim();
            const county = parts[2].trim();
            municipalities.push({
                name,
                slug: slugify(name),
                county,
                countySlug: slugify(county),
                population
            });
        }
    });
    return municipalities;
};


export const parseRawData = (): ExtendedCompany[] => {
    const lines = ALL_COMPANIES_RAW.split('\n').filter(l => l.trim().length > 0);
    const companies: ExtendedCompany[] = [];
    const locMap = getLocationMap();

    lines.forEach(line => {
        // Data is TSV (Tab Separated)
        // Columns: Name, OrgNr, Type, Address, Zip, City, Phone, Fax, Website, Email, RegDate
        const cols = line.split('\t').map(c => c.trim());

        if (cols.length < 5) return; // Skip malformed lines

        const name = cols[0];
        const orgNr = cols[1];
        const type = cols[2];
        const address = cols[3];
        const zip = cols[4];
        const city = cols[5];
        const phone = cols[6] || "";
        const fax = cols[7] || "";
        const website = cols[8] || "";
        const email = cols[9] || "";
        const regDate = cols[10] || "";

        // Validate essential data
        if (name && city && orgNr) {
            const cityLower = city.toLowerCase();
            let municipalityName = city; // Default to city name
            let county = "Övriga Sverige";

            // 1. Check Overrides (Postal City -> Administrative Municipality)
            if (CITY_TO_MUNICIPALITY_OVERRIDES[cityLower]) {
                municipalityName = CITY_TO_MUNICIPALITY_OVERRIDES[cityLower];
                // Resolve County for the overridden municipality
                county = locMap.get(municipalityName.toLowerCase()) || "Övriga Sverige";
            }
            // 2. Check Direct Map (City IS Municipality)
            else {
                const mappedCounty = locMap.get(cityLower);
                if (mappedCounty) {
                    county = mappedCounty;
                    municipalityName = city; // It matched a municipality directly
                } else {
                    // Fallback: No override, no direct municipality match.
                    // Stays as "Övriga Sverige" and municipalitySlug = city slug
                }
            }

            companies.push({
                name,
                orgNr,
                type,
                address,
                zip,
                city,
                phone,
                fax,
                website,
                email,
                regDate,
                // Valid municipality slug comes from the Administrative Name if overridden, else City Name
                municipalitySlug: slugify(municipalityName),
                companySlug: slugify(name),
                county: county,
                countySlug: slugify(county)
            });
        }
    });

    return companies;
};

// Cached data
let cachedCompanies: ExtendedCompany[] | null = null;

export const getAllCompanies = (): ExtendedCompany[] => {
    if (cachedCompanies) return cachedCompanies;
    cachedCompanies = parseRawData();
    return cachedCompanies;
};

export const getCompaniesByMunicipality = (municipalitySlug: string): ExtendedCompany[] => {
    const all = getAllCompanies();
    return all.filter(c => c.municipalitySlug === municipalitySlug);
};

export const getCompanyBySlug = (municipalitySlug: string, companySlug: string): ExtendedCompany | undefined => {
    const all = getAllCompanies();
    return all.find(c => c.municipalitySlug === municipalitySlug && c.companySlug === companySlug);
};

// --- New Geographic Helpers ---

export const getAllCounties = () => {
    const companies = getAllCompanies();
    const counties = new Map<string, string>(); // slug -> name
    companies.forEach(c => {
        if (c.county && c.countySlug) {
            counties.set(c.countySlug, c.county);
        }
    });
    // Ensure all counties from RAW_LOCATIONS are also included even if no companies? 
    // Usually companies cover all counties, but let's be safe if needed. 
    // For now base on companies as per original, but maybe merge?
    // Actually, let's merge with RAW_LOCATIONS counties to be safe.
    const rawCounties = getAllMunicipalitiesFromRaw().map(m => ({ slug: m.countySlug, name: m.county }));
    rawCounties.forEach(rc => counties.set(rc.slug, rc.name));

    return Array.from(counties.entries()).map(([slug, name]) => ({ slug, name })).sort((a, b) => a.name.localeCompare(b.name));
};

export const getMunicipalitiesInCounty = (countySlug: string) => {
    // Return all valid municipalities for the county, not just those with companies
    return getAllMunicipalitiesFromRaw()
        .filter(m => m.countySlug === countySlug)
        .sort((a, b) => a.name.localeCompare(b.name));
};

export const getMunicipalityPaths = () => {
    return getAllMunicipalitiesFromRaw().map(m => m.slug);
};

export const getCountyPaths = () => {
    return getAllCounties().map(c => c.slug);
}

// Special helper to find county for a municipality slug (needed for breadcrumbs/routing)
export const getCountyForMunicipality = (municipalitySlug: string): { name: string, slug: string } | undefined => {
    // Check raw data first for comprehensive list
    const muni = getAllMunicipalitiesFromRaw().find(m => m.slug === municipalitySlug);
    if (muni) {
        return { name: muni.county, slug: muni.countySlug };
    }

    // Fallback to companies just in case
    const companies = getAllCompanies();
    const company = companies.find(c => c.municipalitySlug === municipalitySlug);
    if (company) {
        return { name: company.county, slug: company.countySlug };
    }
    return undefined;
}

export const getMunicipalityParams = () => {
    // Return all municipalities from RAW_LOCATIONS
    return getAllMunicipalitiesFromRaw().map(m => ({
        lan: m.countySlug,
        kommun: m.slug
    }));
};
