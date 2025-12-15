
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
        street_address?: string;
        postcode?: string;
    };
    employer: {
        name: string;
        url?: string;
        organization_number?: string;
    };
    application_deadline?: string;
    webpage_url: string;
    logo_url?: string;
    publication_date: string;
    occupation?: {
        label: string;
    };
    employment_type?: {
        label: string;
    };
    duration?: {
        label: string;
    };
    salary_type?: {
        label: string;
    };
}

export interface JobSearchResponse {
    total: {
        value: number;
    };
    hits: JobAd[];
}

const BASE_URL = "https://jobsearch.api.jobtechdev.se";

export async function searchJobs(location?: string, limit: number = 10): Promise<JobAd[]> {
    try {
        const query = location ? `målare ${location}` : "målare";
        const response = await fetch(
            `${BASE_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}&sort=pubdate-desc`,
            {
                headers: {
                    'accept': 'application/json',
                },
                next: { revalidate: 3600 }
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

export async function getJobAd(id: string): Promise<JobAd | null> {
    try {
        const response = await fetch(`${BASE_URL}/ad/${id}`, {
            headers: { 'accept': 'application/json' },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            if (response.status === 404) return null; // Job gone
            console.error("Job API error:", response.status);
            return null;
        }

        const data: JobAd = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch job ad:", error);
        return null;
    }
}
