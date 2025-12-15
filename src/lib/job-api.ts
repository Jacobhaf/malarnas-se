
export interface JobAd {
    id: string;
    headline: string;
    description: {
        text: string;
        text_formatted?: string;
    };
    workplace_address: {
        municipality: string;
        region: string;
        city?: string;
    };
    employer: {
        name: string;
    };
    application_deadline?: string;
    webpage_url: string;
    logo_url?: string;
    publication_date: string;
}

export interface JobSearchResponse {
    total: {
        value: number;
    };
    hits: JobAd[];
}

export async function searchJobs(location?: string, limit: number = 10): Promise<JobAd[]> {
    try {
        const query = location ? `målare ${location}` : "målare";
        // Using JobTech Dev API
        const response = await fetch(
            `https://jobsearch.api.jobtechdev.se/search?q=${encodeURIComponent(query)}&limit=${limit}&sort=pubdate-desc`,
            {
                headers: {
                    'accept': 'application/json',
                    // 'x-feature-freetext-bool-method': 'and' // Optional for stricter search
                },
                next: { revalidate: 3600 } // Cache for 1 hour
            }
        );

        if (!response.ok) {
            console.error("Job API error:", response.status, response.statusText);
            return [];
        }

        const data: JobSearchResponse = await response.json();
        return data.hits || [];
    } catch (error) {
        console.error("Failed to fetch jobs:", error);
        return [];
    }
}
