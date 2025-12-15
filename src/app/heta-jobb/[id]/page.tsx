import { getJobAd } from "@/lib/job-api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Building, ExternalLink, Briefcase, Clock, DollarSign, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";

interface JobPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: JobPageProps) {
    const { id } = await params;
    const job = await getJobAd(id);

    if (!job) {
        return {
            title: "Jobbet hittades inte",
        };
    }

    return {
        title: `${job.headline} | Lediga jobb hos ${job.employer.name}`,
        description: `Sök jobbet som ${job.occupation?.label || 'Målare'} hos ${job.employer.name} i ${job.workplace_address.municipality || 'Sverige'}.`,
    };
}

export default async function JobPage({ params }: JobPageProps) {
    const { id } = await params;
    const job = await getJobAd(id);

    if (!job) {
        return notFound();
    }

    // Format description text (simple handling of line breaks if not html)
    const descriptionHtml = job.description.text_formatted || job.description.text.replace(/\n/g, '<br />');

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Minimal Hero */}
            <div className="bg-[#102a43] text-white py-12">
                <div className="container mx-auto px-4">
                    <Link href="/heta-jobb" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors text-sm font-medium">
                        <ArrowLeft size={16} className="mr-2" />
                        Tillbaka till alla jobb
                    </Link>

                    <div className="max-w-4xl">
                        <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-4">{job.headline}</h1>
                                <div className="flex flex-wrap gap-4 text-blue-100 text-sm">
                                    <span className="flex items-center gap-1.5 bg-blue-900/50 px-3 py-1 rounded-full">
                                        <Building size={14} />
                                        {job.employer.name}
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-blue-900/50 px-3 py-1 rounded-full">
                                        <MapPin size={14} />
                                        {job.workplace_address.municipality || "Sverige"}
                                    </span>
                                    {job.application_deadline && (
                                        <span className="flex items-center gap-1.5 bg-blue-900/50 px-3 py-1 rounded-full text-white">
                                            <Calendar size={14} />
                                            Sista ansökan: {format(new Date(job.application_deadline), 'd MMM yyyy', { locale: sv })}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {job.logo_url && (
                                <div className="bg-white p-4 rounded-xl shadow-lg w-24 h-24 flex items-center justify-center flex-shrink-0">
                                    <img
                                        src={job.logo_url}
                                        alt={`${job.employer.name} logotyp`}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {/* Main Content */}
                    <article className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        {/* Key Info Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 pb-10 border-b border-gray-100">
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase mb-1">Yrke</h3>
                                <div className="flex items-center gap-2 font-medium text-gray-900">
                                    <Briefcase size={18} className="text-blue-600" />
                                    {job.occupation?.label || "Målare"}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase mb-1">Omfattning</h3>
                                <div className="flex items-center gap-2 font-medium text-gray-900">
                                    <Clock size={18} className="text-blue-600" />
                                    {job.duration?.label || "Heltid"}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase mb-1">Lön</h3>
                                <div className="flex items-center gap-2 font-medium text-gray-900">
                                    <DollarSign size={18} className="text-blue-600" />
                                    {job.salary_type?.label || "Enligt överenskommelse"}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div
                            className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-strong:text-gray-900"
                            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                        />

                        {/* Apply CTA at bottom of text */}
                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <a
                                href={job.webpage_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all w-full md:w-auto transform hover:-translate-y-0.5"
                            >
                                Ansök hos arbetsgivaren
                                <ExternalLink size={20} />
                            </a>
                            <p className="text-sm text-gray-500 mt-4 text-center md:text-left">
                                Du skickas vidare till arbetsgivarens rekryteringssida eller Platsbanken.
                            </p>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-8">
                        {/* Company Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Om arbetsgivaren</h3>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl">
                                    {job.employer.name.charAt(0)}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="font-bold text-gray-900 truncate">{job.employer.name}</p>
                                    <p className="text-sm text-gray-500 truncate">{job.workplace_address.municipality || "Sverige"}</p>
                                </div>
                            </div>
                            <a
                                href={job.webpage_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-center bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold py-3 rounded-xl transition-colors mb-4"
                            >
                                Gå till annonsen
                            </a>
                            <div className="text-xs text-center text-gray-400">
                                Annons publicerad: {format(new Date(job.publication_date), 'yyyy-MM-dd')}
                            </div>
                        </div>

                        {/* Lead Form - Contextual */}
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Vill du att företagen söker upp dig istället?</h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Är du målare som söker nya uppdrag? Eller privatperson som behöver hjälp?
                            </p>
                            <LeadForm />
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
