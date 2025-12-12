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
    const lines = RAW_CSV_DATA.split('\n').filter(l => l.trim().length > 0);
    const companies: ExtendedCompany[] = [];

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
