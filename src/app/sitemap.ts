
import { getCompanies, getCounties, getLocations, getMunicipalitySlugForCompany } from '@/lib/data';
import { slufigy } from '@/lib/utils';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://malarnas.se';

    // Base routes
    const routes = [
        '',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }));

    // County routes
    const counties = getCounties().map((county) => ({
        url: `${baseUrl}/malerifirma/${slufigy(county)}`,
        lastModified: new Date(),
    }));

    // Municipality routes
    const municipalities = getLocations().map((l) => ({
        url: `${baseUrl}/malerifirma/${slufigy(l.lan)}/${slufigy(l.kommun)}`,
        lastModified: new Date(),
    }));

    // Company routes (Limited for safety/timeout in this environment, but logic holds)
    // In a real large app, we might split sitemaps.
    // We'll include all of them here since we have the data in memory.
    const companies = getCompanies().map((c) => ({
        url: `${baseUrl}/${getMunicipalitySlugForCompany(c)}/${slufigy(c.name)}`,
        lastModified: new Date(),
    }));

    return [...routes, ...counties, ...municipalities, ...companies];
}
