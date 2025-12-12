import { getAllCompanies, getMunicipalityPaths } from '@/lib/company-data';
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

    // Municipality routes
    const municipalityPaths = getMunicipalityPaths();
    const municipalities = municipalityPaths.map((slug) => ({
        url: `${baseUrl}/malerifirma/${slug}`,
        lastModified: new Date(),
    }));

    // Company routes
    // For large sites, sitemaps are often split. Here we generate what we can.
    // If > 50k URLs, this needs splitting.
    const allCompanies = getAllCompanies();
    const companyRoutes = allCompanies.map((c) => ({
        url: `${baseUrl}/${c.municipalitySlug}/${c.companySlug}`,
        lastModified: new Date(),
    }));

    return [...routes, ...municipalities, ...companyRoutes];
}
