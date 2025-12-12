
import React from 'react';

export default function TrustpilotWidget() {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between max-w-sm">
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">Utmärkt</span>
                <div className="flex gap-1 my-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-5 h-5 bg-[#00b67a] flex items-center justify-center rounded-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                        </div>
                    ))}
                </div>
                <span className="text-xs text-gray-500">Baserat på 1 200+ omdömen</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-8 h-8">
                    <svg viewBox="0 0 24 24" fill="#00b67a">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.417 17.5l1.04-4.6-3.541-3.23 4.674-.326 1.815-4.444 1.83 4.444 4.672.326-3.539 3.23 1.038 4.6-4.004-2.52-3.985 2.52z" />
                    </svg>
                </div>
                <span className="font-bold text-gray-900">Trustpilot</span>
            </div>
        </div>
    );
}
