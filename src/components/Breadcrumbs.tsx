
import Link from 'next/link';
import { Breadcrumb } from '@/lib/types';

export default function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
    return (
        <nav className="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link href="/" className="inline-flex items-center hover:text-primary transition-colors">
                        Hem
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <span className="mx-2 text-gray-400">/</span>
                            <Link href={item.url} className={`hover:text-primary transition-colors ${index === items.length - 1 ? 'font-semibold text-gray-900 pointer-events-none' : ''}`}>
                                {item.label}
                            </Link>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
