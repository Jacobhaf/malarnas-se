import { searchJobs } from "@/lib/job-api";
import JobList from "@/components/JobList";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";

export const metadata = {
    title: "Lediga Målarjobb - Hitta jobb som målare i hela Sverige",
    description: "Sök bland hundratals lediga jobb för målare. Vi listar aktuella måleri-tjänster från hela Sverige. Hitta ditt nästa drömjobb idag!",
};

export default async function JobsPage() {
    const jobs = await searchJobs("Sverige", 50); // Fetch up to 50 jobs

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-[#102a43] text-white py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <Breadcrumbs
                        items={[
                            { label: "Hem", url: "/" },
                            { label: "Heta jobb", url: "/heta-jobb" }
                        ]}
                        className="mb-6 text-blue-200"
                    />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Lediga Målarjobb
                    </h1>
                    <p className="text-xl text-blue-200 max-w-2xl">
                        Här hittar du de senaste lediga tjänsterna inom måleri från hela Sverige.
                        Vi hämtar jobbannonser direkt från Arbetsförmedlingen.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <JobList jobs={jobs} title="Senaste jobben" locationName="Sverige" />
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Söker du jobb?</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Många målerifirmor letar ständigt efter duktiga målare. Se till att ditt CV är uppdaterat och sök jobben direkt via länkarna.
                            </p>
                        </div>
                        <LeadForm />
                    </aside>
                </div>
            </div>
        </main>
    );
}
