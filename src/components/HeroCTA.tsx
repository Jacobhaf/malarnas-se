"use client";

import { useQuoteModal } from "@/components/providers/QuoteModalProvider";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export default function HeroCTA() {
    const { openModal } = useQuoteModal();

    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-200">
            <button
                onClick={openModal}
                className="w-full sm:w-auto bg-[#22c55e] hover:bg-green-600 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
            >
                Jämför offerter gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
                href="/malerifirma"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-lg py-4 px-8 rounded-full transition-all flex items-center justify-center gap-2"
            >
                <MapPin className="w-5 h-5" />
                Hitta målare nära dig
            </Link>
        </div>
    );
}
