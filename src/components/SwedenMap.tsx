
import Image from 'next/image';
import Link from 'next/link';
import { slufigy } from '@/lib/utils';

// Define approximate center points for interaction markers
// These percentages are estimated based on a standard vertical map of Sweden
const COUNTY_POSITIONS: Record<string, { top: number; left: number }> = {
    'Norrbottens län': { top: 15, left: 65 },
    'Västerbottens län': { top: 30, left: 55 },
    'Jämtlands län': { top: 42, left: 35 },
    'Västernorrlands län': { top: 45, left: 55 },
    'Gävleborgs län': { top: 55, left: 50 },
    'Dalarnas län': { top: 58, left: 35 },
    'Värmlands län': { top: 65, left: 25 },
    'Örebro län': { top: 68, left: 40 },
    'Västmanlands län': { top: 68, left: 50 },
    'Uppsala län': { top: 67, left: 60 },
    'Stockholms län': { top: 69, left: 65 },
    'Södermanlands län': { top: 72, left: 55 },
    'Östergötlands län': { top: 76, left: 50 },
    'Västra Götalands län': { top: 78, left: 25 },
    'Jönköpings län': { top: 82, left: 40 },
    'Kalmar län': { top: 85, left: 55 },
    'Gotlands län': { top: 83, left: 70 },
    'Hallands län': { top: 85, left: 25 },
    'Kronobergs län': { top: 87, left: 40 },
    'Blekinge län': { top: 90, left: 48 },
    'Skåne län': { top: 93, left: 35 },
};

export default function SwedenMap() {
    return (
        <div className="relative w-full max-w-[600px] mx-auto">
            <Image
                src="/sweden-map.jpg"
                alt="Karta över Sveriges län"
                width={600}
                height={1200}
                className="w-full h-auto"
                priority
            />
            {Object.entries(COUNTY_POSITIONS).map(([name, pos]) => {
                const slug = slufigy(name);
                return (
                    <Link
                        key={name}
                        href={`/malerifirma/${slug}`}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center group"
                        style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
                        aria-label={`Visa målare i ${name}`}
                    >
                        <span className="relative flex h-3 w-3 md:h-4 md:w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 group-hover:bg-green-400"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 md:h-4 md:w-4 bg-blue-500 group-hover:bg-green-500 shadow-sm border border-white"></span>
                        </span>
                        {/* Tooltip on hover */}
                        <span className="absolute bottom-full mb-2 hidden group-hover:block whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-10">
                            {name}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}
