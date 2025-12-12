
import Link from 'next/link';
import { Location } from '@/lib/types';
import { slufigy } from '@/lib/utils';

interface MunicipalityListProps {
    municipalities: Location[];
    countySlug: string;
}

export default function MunicipalityList({ municipalities, countySlug }: MunicipalityListProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {municipalities.map((m) => (
                <Link
                    key={m.kommun}
                    href={`/malerifirma/${slufigy(m.kommun)}`}
                    className="text-sm text-gray-600 hover:text-primary hover:underline transition-colors py-1"
                >
                    Målare i {m.kommun}
                </Link>
            ))}
        </div>
    );
}
