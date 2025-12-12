

import { ALL_COMPANIES_RAW } from '@/data/index';
import { Location, Company } from './types';
import { slufigy, parseNumber } from './utils';

// We import RAW_LOCATIONS from the raw-locations file, not index.
import { RAW_LOCATIONS as RAW_LOCATIONS_STRING } from '@/data/raw-locations';

let parsedLocations: Location[] | null = null;
let parsedCompanies: Company[] | null = null;

export function getLocations(): Location[] {
    if (parsedLocations) return parsedLocations;

    const lines = RAW_LOCATIONS_STRING.trim().split('\n');
    parsedLocations = lines.map(line => {
        const [kommun, folkMangd, lan] = line.split('\t');
        return {
            kommun: kommun?.trim() || '',
            folkMangd: parseNumber(folkMangd || ''),
            lan: lan?.trim() || '',
        };
    }).filter(l => l.kommun).sort((a, b) => a.kommun.localeCompare(b.kommun));

    return parsedLocations;
}

export function getCounties(): string[] {
    const locations = getLocations();
    const counties = new Set(locations.map(l => l.lan));
    return Array.from(counties).sort();
}

export function getMunicipalitiesByCounty(county: string): Location[] {
    const targetSlug = slufigy(county);
    return getLocations().filter(l => slufigy(l.lan) === targetSlug);
}

export function getCompanies(): Company[] {
    if (parsedCompanies) return parsedCompanies;

    const lines = ALL_COMPANIES_RAW.trim().split('\n');
    const companiesMap = new Map<string, Company>();

    lines.forEach(line => {
        if (!line.trim()) return;
        const parts = line.split('\t');
        const name = parts[0]?.trim() || '';
        const orgNr = parts[1]?.trim() || '';

        if (!name || companiesMap.has(orgNr)) return;

        companiesMap.set(orgNr, {
            name,
            orgNr,
            type: parts[2]?.trim() || '',
            address: parts[3]?.trim() || '',
            zip: parts[4]?.trim() || '',
            city: parts[5]?.trim() || '',
            phone: parts[6]?.trim() || '',
            website: parts[7]?.trim() || '',
            email: parts[8]?.trim() || '',
            registrationDate: parts[9]?.trim() || '',
        });
    });

    parsedCompanies = Array.from(companiesMap.values());
    return parsedCompanies;
}

export function getCompaniesByMunicipality(municipalityName: string): Company[] {
    const allCompanies = getCompanies();
    const normalizedMunicipality = municipalityName.toLowerCase().replace('s kommun', '').trim();
    const muniSlug = slufigy(normalizedMunicipality);

    return allCompanies.filter(c => {
        const citySlug = slufigy(c.city);
        return citySlug.includes(muniSlug) || muniSlug.includes(citySlug);
    });
}

export function getCompanyBySlug(slug: string): Company | undefined {
    return getCompanies().find(c => slufigy(c.name) === slug);
}

export function getMunicipalityBySlug(slug: string): Location | undefined {
    return getLocations().find(l => slufigy(l.kommun) === slug);
}

export function getCountyBySlug(slug: string): string | undefined {
    return getCounties().find(c => slufigy(c) === slug);
}

export function getMunicipalitySlugForCompany(company: Company): string {
    const locations = getLocations();
    const citySlug = slufigy(company.city);

    const match = locations.find(l => slufigy(l.kommun) === citySlug);
    if (match) return slufigy(match.kommun);

    const matchS = locations.find(l => slufigy(l.kommun) === citySlug + 's');
    if (matchS) return slufigy(matchS.kommun);

    if (citySlug.endsWith('s')) {
        const matchNoS = locations.find(l => slufigy(l.kommun) === citySlug.slice(0, -1));
        if (matchNoS) return slufigy(matchNoS.kommun);
    }

    return citySlug;
}
