import { getAllCompanies, getAllCounties, getMunicipalityParams } from '@/lib/company-data';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://malarnas.se';

    // Base routes
    const routes = [
        '',
        '/malerifirma'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }));

    // County routes
    const counties = getAllCounties();
    const countyRoutes = counties.map(c => ({
        url: `${baseUrl}/malerifirma/${c.slug}`,
        lastModified: new Date(),
    }));

    // Municipality routes (Nested)
    const municipalityParams = getMunicipalityParams();
    const municipalityRoutes = municipalityParams.map((p) => ({
        url: `${baseUrl}/malerifirma/${p.lan}/${p.kommun}`,
        lastModified: new Date(),
    }));

    // Company routes
    const allCompanies = getAllCompanies();
    const companyRoutes = allCompanies.map((c) => ({
        url: `${baseUrl}/${c.municipalitySlug}/${c.companySlug}`,
        lastModified: new Date(),
    }));

    return [...routes, ...countyRoutes, ...municipalityRoutes, ...companyRoutes];
}
