
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ARTICLES } from '@/data/articles';

export const metadata: Metadata = {
    title: 'Måleriartiklar & Guider – Tips inför målning | Målarnas',
    description: 'Läs våra guider om målning och renovering. Få tips om inomhusmålning, fasadmålning, tapetsering och snickerimålning inför ditt projekt.',
};

export default function ArticlesPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero / Header Section */}
            <div className="bg-[#0b1e33] text-white py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <Breadcrumbs
                        items={[
                            { label: 'Hem', url: '/' },
                            { label: 'Artiklar', url: '/artiklar' }
                        ]}
                        className="mb-6 text-gray-300"
                    />
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                        Guider & Artiklar
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                        Här har vi samlat information, tips och råd för dig som planerar att måla om eller renovera. Läs på inför ditt projekt!
                    </p>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ARTICLES.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/artiklar/${article.slug}`}
                            className="group relative h-80 w-full overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 block"
                        >
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h2 className="text-white text-xl font-bold mb-1 leading-tight group-hover:text-blue-100 transition-colors">
                                    {article.title.split('–')[0].trim()} {/* Show only main part of title if using long titles in data, or just full title if preferred. Based on user image, short titles like "Inomhusmålning" are preferred. The data has "Inomhusmålning – ...". Let's split it. */}
                                </h2>
                                <p className="text-gray-300 text-xs md:text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    {article.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
