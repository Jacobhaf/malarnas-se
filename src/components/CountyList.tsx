
import Link from 'next/link';
import { slufigy } from '@/lib/utils';

export default function CountyList({ counties }: { counties: string[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {counties.map((county) => (
                <Link
                    key={county}
                    href={`/malerifirma/${slufigy(county)}`}
                    className="group block p-4 bg-white border border-gray-100 rounded-lg hover:shadow-md hover:border-primary/20 transition-all duration-300"
                >
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                            {county}
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors"
                        >
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </div>
                </Link>
            ))}
        </div>
    );
}
