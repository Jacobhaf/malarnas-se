
import { Company } from "@/lib/types";
import { slufigy } from "@/lib/utils";
import Link from "next/link";

interface CompanyCardProps {
    company: Company;
    municipalitySlug: string;
}

export default function CompanyCard({ company, municipalitySlug }: CompanyCardProps) {
    const companySlug = slufigy(company.name);
    const companyUrl = `/${municipalitySlug}/${companySlug}`;

    return (
        <div className="bg-white border text-center border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {company.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{company.city}</p>

                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3a1.5 1.5 0 0 1 3 0V7.5h5.25a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5h-10.5a1.5 1.5 0 0 1-1.5-1.5V9a1.5 1.5 0 0 1 1.5-1.5H7.5V3Z" />
                        </svg>
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    Professionell målerifirma baserad i {company.city}. Kontakta oss för offert på måleriarbeten.
                </p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                {company.phone && (
                    <a href={`tel:${company.phone}`} className="text-sm font-medium text-gray-700 hover:text-primary transition-colors flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        {company.phone}
                    </a>
                )}
                <Link
                    href={companyUrl}
                    className="block w-full py-2.5 px-4 bg-gray-50 hover:bg-primary hover:text-white text-gray-900 font-medium rounded-lg transition-colors text-sm text-center"
                >
                    Se företagsprofil
                </Link>
            </div>
        </div>
    );
}
