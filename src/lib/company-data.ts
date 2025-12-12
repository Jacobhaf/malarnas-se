import { RAW_CSV_DATA } from "@/data/raw-companies-list";
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
}

// Reuse the same slugify logic you might have elsewhere, or define it here


export const parseRawData = (): ExtendedCompany[] => {
    const lines = RAW_CSV_DATA.split('\n').map(l => l.trim());
    const companies: ExtendedCompany[] = [];

    // Regex for OrgNr: 6 digits, hyphen/space/nothing, 4 digits. e.g 556723-9313
    const orgNrRegex = /^\d{6}[-\s]?\d{4}$/;

    for (let i = 0; i < lines.length; i++) {
        // Look for a line that looks like an OrgNr. 
        // The line BEFORE it is the Company Name.
        if (orgNrRegex.test(lines[i])) {
            // Found an OrgNr at index i.
            // Company Name is likely at i-1.
            const name = lines[i - 1];
            const orgNr = lines[i];

            // Safety check: Name should exist
            if (!name) continue;

            // Extract subsequent fields based on their typical order relative to OrgNr
            // OrgNr is at i
            // i+1: Type (e.g. "Aktiebolag")
            // i+2: Address (e.g "Stationsvägen 55")
            // i+3: Zip (e.g "184 40")
            // i+4: City (e.g "Åkersberga")
            // i+5: Phone (e.g "08-540 694 00") OR empty

            // We need to be careful with optional fields like phone, empty lines, url, etc.
            // However, looking at the dataset structure:
            // Fields seem to be stored sequentially in the string blocks.

            const type = lines[i + 1] || "";
            const address = lines[i + 2] || "";
            const zip = lines[i + 3] || "";
            const city = lines[i + 4] || "";

            // After city (i+4), we have Phone, Fax, Website, Email, RegDate.
            // But there are empty lines in between in the raw data!
            // We need to scan forward from i+5 until we hit the next company (next OrgNr) or end.

            // Let's grab everything from i+5 until we find a date-like string at the end of the block.
            // Reg date format: YYYY-MM-DD
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

            let phone = "";
            let fax = "";
            let website = "";
            let email = "";
            let regDate = "";

            // Scan ahead to find the reg date, usually within next 10 lines
            let dateIndex = -1;
            for (let j = i + 5; j < i + 15 && j < lines.length; j++) {
                if (dateRegex.test(lines[j])) {
                    regDate = lines[j];
                    dateIndex = j;
                    break;
                }
            }

            // If we found a date, the fields between City (i+4) and Date (dateIndex) are potential contacts
            if (dateIndex > i + 4) {
                const contactLines = lines.slice(i + 5, dateIndex).filter(l => l.length > 0);

                // Heuristic basic assignment for contact details
                contactLines.forEach(l => {
                    if (l.startsWith("http") || l.startsWith("www")) {
                        website = l;
                    } else if (l.includes("@")) {
                        email = l;
                    } else if (/[0-9]/.test(l)) {
                        // Start of phone number often 08-, 070-, etc.
                        // If we haven't assigned phone yet, assume first number-heavy string is phone
                        if (!phone) phone = l;
                        else fax = l; // If phone taken, might be fax (rare, but whatever)
                    }
                });
            }

            // Validate we have a critical mass of data (Name + City at minimum for pages to work)
            if (name && city) {
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
                    municipalitySlug: slugify(city),
                    companySlug: slugify(name)
                });
            }
        }
    }

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

// Functions from previous system (adapting locations)
export const getAllMunicipalitiesFromCompanies = () => {
    const companies = getAllCompanies();
    const municipalities = new Set(companies.map(c => c.city));
    return Array.from(municipalities).sort();
};

export const getMunicipalityPaths = () => {
    const companies = getAllCompanies();
    const paths = new Set(companies.map(c => c.municipalitySlug));
    return Array.from(paths);
}
