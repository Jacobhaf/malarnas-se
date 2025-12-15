"use client";

import { useQuoteModal } from "@/components/providers/QuoteModalProvider";

export default function LeadForm() {
    const { openModal } = useQuoteModal();

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Få offerter från målare</h3>
            <p className="text-sm text-gray-500 mb-6">
                Beskriv ditt projekt och jämför priser helt kostnadsfritt.
            </p>

            <button
                onClick={openModal}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
                Begär offert gratis
            </button>

            <p className="text-xs text-gray-400 mt-4">
                Genom att klicka godkänner du våra villkor. Tjänsten är inte bindande.
            </p>
        </div>
    );
}
