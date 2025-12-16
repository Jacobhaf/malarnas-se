"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";

interface County {
    slug: string;
    name: string;
}

interface Props {
    counties: County[];
}

export default function CountyListCollapsible({ counties }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:border-blue-500 hover:shadow-md transition-all group"
                >
                    <span className="flex items-center gap-3 font-semibold text-gray-900">
                        <span className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <MapPin size={20} />
                        </span>
                        Se alla län
                    </span>
                    <ChevronDown className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                </button>
            ) : (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-full flex items-center justify-between p-4 border border-blue-100 rounded-t-xl bg-blue-50/50 hover:bg-blue-50 transition-colors mb-0 text-left border-b-0"
                    >
                        <span className="flex items-center gap-3 font-semibold text-blue-900">
                            <span className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                <MapPin size={20} />
                            </span>
                            Välj län
                        </span>
                        <ChevronUp className="text-blue-600" />
                    </button>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border border-t-0 border-gray-200 rounded-b-xl bg-white shadow-sm">
                        {counties.map(county => (
                            <li key={county.slug}>
                                <Link
                                    href={`/malerifirma/${county.slug}`}
                                    className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors bg-white text-gray-800 text-sm"
                                >
                                    <span>{county.name}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
