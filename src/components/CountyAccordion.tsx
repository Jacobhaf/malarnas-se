
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { slufigy } from '@/lib/utils';
import { Location } from '@/lib/types';

interface CountyAccordionProps {
    locations: Location[];
    activeSlugs?: string[];
}

export default function CountyAccordion({ locations, activeSlugs }: CountyAccordionProps) {
    // Group locations by county
    const counties: Record<string, Location[]> = {};
    locations.forEach(loc => {
        if (!counties[loc.lan]) {
            counties[loc.lan] = [];
        }
        counties[loc.lan].push(loc);
    });

    const sortedCounties = Object.keys(counties).sort();
    const [openCounty, setOpenCounty] = useState<string | null>(null);

    const toggleCounty = (county: string) => {
        if (openCounty === county) {
            setOpenCounty(null);
        } else {
            setOpenCounty(county);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-4">
            {sortedCounties.map((county) => {
                const isOpen = openCounty === county;

                return (
                    <div key={county} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <button
                            onClick={() => toggleCounty(county)}
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                        >
                            <h3 className={`text-xl font-bold transition-colors ${isOpen ? 'text-[#1e40af]' : 'text-gray-900'}`}>
                                {county}
                            </h3>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                        </button>

                        <div
                            className={`transition-all duration-300 ease-in-out bg-gray-50/50 ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            {isOpen && (
                                <div className="p-6 pt-0 border-t border-gray-100">
                                    <div className="pt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3 gap-x-6">
                                        {counties[county].map((loc) => {
                                            const slug = slufigy(loc.kommun);
                                            return (
                                                <Link
                                                    key={loc.kommun}
                                                    href={`/malerifirma/${slug}`}
                                                    className="text-gray-600 hover:text-[#22c55e] hover:translate-x-1 transition-all flex items-center gap-2 group"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#22c55e] transition-colors"></span>
                                                    {loc.kommun}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
