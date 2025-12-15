"use client";

import { FaqItem } from "@/lib/faq-data";
import RequestQuoteButton from "./RequestQuoteButton";

interface FaqSectionProps {
    items: FaqItem[];
    areaName: string;
}

export default function FaqSection({ items, areaName }: FaqSectionProps) {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": items.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answerText
            }
        }))
    };

    return (
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 my-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ – Måleri i {areaName}</h2>

            <div className="space-y-8">
                {items.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.question}</h3>
                        <p className="text-gray-700 leading-relaxed">{item.answerText}</p>
                    </div>
                ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-xl text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Behöver du hjälp?</h3>
                <p className="text-gray-600 mb-6">
                    Vi hjälper dig att komma i kontakt med bra målare i {areaName}.
                </p>
                <RequestQuoteButton
                    text={`Få offert i ${areaName}`}
                    className="py-3 px-8 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                />
            </div>
        </section>
    );
}
