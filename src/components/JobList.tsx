"use client";

import { JobAd } from "@/lib/job-api";
import { MapPin, Calendar, Building, ExternalLink, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import Link from "next/link";

interface JobListProps {
    jobs: JobAd[];
    title?: string;
    locationName?: string;
    showEmptyMessage?: boolean;
}

export default function JobList({ jobs, title, locationName, showEmptyMessage = true }: JobListProps) {
    if (jobs.length === 0) {
        if (!showEmptyMessage) return null;
        return (
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 text-center my-8">
                <Briefcase className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">
                    Hittade inga lediga målarjobb i {locationName || "detta område"} just nu.
                </p>
                <p className="text-sm text-gray-400 mt-1">Kom tillbaka senare!</p>
            </div>
        );
    }

    return (
        <section className="my-12">
            {title && (
                <div className="flex items-center gap-3 mb-6">
                    <Briefcase className="w-6 h-6 text-[#102a43]" />
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                </div>
            )}

            <div className="space-y-4">
                {jobs.map((job) => (
                    <article
                        key={job.id}
                        className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow group flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                        <div className="flex gap-4 w-full">
                            {job.logo_url && (
                                <div className="hidden sm:flex flex-shrink-0 w-16 h-16 bg-white border border-gray-100 rounded-lg items-center justify-center p-2">
                                    <img
                                        src={job.logo_url}
                                        alt={`${job.employer.name} logotyp`}
                                        className="max-w-full max-h-full object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            )}

                            <div className="space-y-2 flex-grow">
                                <div className="flex items-center gap-2 text-xs font-medium text-blue-600 uppercase tracking-wide">
                                    <Building size={12} />
                                    {job.employer.name}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    <Link href={`/heta-jobb/${job.id}`}>
                                        {job.headline}
                                    </Link>
                                </h3>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={16} className="text-gray-400" />
                                        {job.workplace_address.municipality || job.workplace_address.region || "Sverige"}
                                    </div>

                                    {job.application_deadline && (
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={16} className="text-gray-400" />
                                            <span>Ansök senast {format(new Date(job.application_deadline), 'd MMM', { locale: sv })}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex-shrink-0 w-full md:w-auto pl-0 sm:pl-20 md:pl-0 mt-4 md:mt-0">
                            <Link
                                href={`/heta-jobb/${job.id}`}
                                className="flex items-center justify-center gap-2 w-full md:w-auto bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-2.5 px-6 rounded-lg transition-colors text-sm"
                            >
                                Läs mer
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
