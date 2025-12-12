import { RAW_CSV_DATA } from "@/data/raw-companies-list";

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
export const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[åä]/g, 'a')
        .replace(/ö/g, 'o')
        .replace(/é/g, 'e')
        .replace(/&/g, '')
        .replace(/\//g, '')
        .replace(/[^a-z0-9-]/g, '-') // Replace non-alphanumeric chars with -
        .replace(/-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start of text
        .replace(/-+$/, '');         // Trim - from end of text
};

export const parseRawData = (): ExtendedCompany[] => {
    const lines = RAW_CSV_DATA.split('\n');
    const companies: ExtendedCompany[] = [];

    // Skip header if it exists (Starts with BOLAGSNAMN)
    let startIndex = 0;
    if (lines[0].startsWith('BOLAGSNAMN')) {
        startIndex = 1; // Skip header line
    }

    // The format seems to vary. Based on the paste, it looks like blocks of 11 lines per company.
    // EXCEPT the paste has newlines. Let's look closer.
    // It's line-by-line fields.
    /*
    Name
    Org
    Type
    Address
    Zip
    City
    Phone
    Fax (often empty)
    Web (often empty)
    Email (often empty)
    Date
    */

    // Clean empty lines first to make it a strict stream
    const cleanLines = lines.map(l => l.trim()).filter(l => l.length > 0);

    // Now we need to be careful. The user paste shows empty lines were removed in my `cleanLines` logic?
    // Wait, in the provided text:
    /*
    Östernäs Måleri & Entreprenad Aktiebolag
    556723-9313
    Aktiebolag
    Stationsvägen 55
    184 40
    Åkersberga
    08-540 694 00 <-- Phone
    <empty>
    https://osternasmaleri.se <-- Web
    <empty>
    2007-02-16 <-- Date
    */

    // The empty lines are significant as placeholders for missing data!
    // I should re-read using the raw lines, skipping the very first header line.

    const rawDataLines = lines.slice(1); // Skip Header

    let currentBlock: string[] = [];

    for (let i = 0; i < rawDataLines.length; i++) {
        // The pattern repeats every 11 lines in the raw text provided in the prompt?
        // Let's verify with the first entry in raw-companies-list.ts
        // Line 1: Östernäs...
        // Line 2: 5567...
        // Line 3: Aktiebolag
        // Line 4: Stationsvägen 55
        // Line 5: 184 40
        // Line 6: Åkersberga
        // Line 7: 08-540...
        // Line 8: (empty) -> Fax
        // Line 9: https://...
        // Line 10: (empty) -> Email
        // Line 11: 2007-02-16

        // Yes, it is exactly 11 lines per record.

        const chunk = rawDataLines.slice(i, i + 11);
        if (chunk.length < 11) break; // End of file

        const company: Company = {
            name: chunk[0].trim(),
            orgNr: chunk[1].trim(),
            type: chunk[2].trim(),
            address: chunk[3].trim(),
            zip: chunk[4].trim(),
            city: chunk[5].trim(),
            phone: chunk[6].trim(),
            fax: chunk[7].trim(),
            website: chunk[8].trim(),
            email: chunk[9].trim(),
            regDate: chunk[10].trim(),
        };

        // Only add if it looks valid
        if (company.name && company.orgNr) {
            companies.push({
                ...company,
                municipalitySlug: slugify(company.city),
                companySlug: slugify(company.name)
            });
        }

        i += 10; // Increment loop by 10 (loop adds 1 more)
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
