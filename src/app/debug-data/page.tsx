
import { getAllCompanies, getMunicipalityPaths } from "@/lib/company-data";
import { parseRawData } from "@/lib/company-data";

export default function DebugPage() {
    const companies = getAllCompanies();
    const paths = getMunicipalityPaths();

    // Calculate counts per municipality
    const counts: Record<string, number> = {};
    companies.forEach(c => {
        counts[c.municipalitySlug] = (counts[c.municipalitySlug] || 0) + 1;
    });

    return (
        <div className="p-8 max-w-4xl mx-auto mb-20">
            <h1 className="text-2xl font-bold mb-4">Debug Diagnostics</h1>

            <div className="mb-8 p-4 bg-gray-100 rounded">
                <h2 className="font-bold">Summary</h2>
                <p>Total Parsed Companies: {companies.length}</p>
                <p>Total Unique Municipalities (Slugs): {paths.length}</p>
            </div>

            <div className="mb-8">
                <h2 className="font-bold mb-2">Top 50 Municipalities by Company Count</h2>
                <div className="grid grid-cols-2 gap-2 text-sm max-h-60 overflow-y-auto border p-2">
                    {Object.entries(counts)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 50)
                        .map(([slug, count]) => (
                            <div key={slug} className="flex justify-between">
                                <span>{slug}</span>
                                <span className="font-mono">{count}</span>
                            </div>
                        ))}
                </div>
            </div>

            <div className="mb-8">
                <h2 className="font-bold mb-2">Sample Company Data (First 3)</h2>
                <pre className="bg-slate-800 text-white p-4 rounded overflow-auto text-xs">
                    {JSON.stringify(companies.slice(0, 3), null, 2)}
                </pre>
            </div>
        </div>
    );
}
