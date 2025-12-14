"use client";

import { useState } from 'react';

export default function LeadForm() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would normally send the data to an API
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tack för din förfrågan!</h3>
                <p className="text-gray-600">Vi har mottagit dina uppgifter och matchar dig snart med lokala målerifirmor.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Få offerter från målare</h3>
            <p className="text-sm text-gray-500 mb-6">Beskriv ditt projekt och jämför priser kostnadsfritt.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Vad behöver du hjälp med?</label>
                    <select id="service" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                        <option>Invändig målning</option>
                        <option>Utvändig målning</option>
                        <option>Tapetsering</option>
                        <option>Annat</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Beskrivning</label>
                    <textarea
                        id="description"
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="T.ex. måla om vardagsrum på 25 kvm..."
                    ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">Postnummer</label>
                        <input
                            type="text"
                            id="zip"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-post</label>
                        <input
                            type="email"
                            id="email"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                    Hitta målare nu
                </button>
                <p className="text-xs text-gray-400 text-center mt-4">
                    Genom att skicka in godkänner du våra villkor. Tjänsten är helt gratis.
                </p>
            </form>
        </div>
    );
}
