import { getArticle, ARTICLES } from "@/data/articles";
import { notFound } from "next/navigation";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return ARTICLES.map(article => ({
        slug: article.slug
    }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const article = getArticle(slug);

    if (!article) return { title: "Artikeln hittades inte" };

    return {
        title: `${article.title.split('–')[0].trim()} | Målarnas.se`,
        description: article.description,
    };
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const article = getArticle(slug);

    if (!article) {
        notFound();
    }

    const otherArticles = ARTICLES.filter(a => a.slug !== slug).slice(0, 4);

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Immersive Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] w-full flex flex-col justify-center items-center text-center text-white overflow-hidden">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover blur-[2px] brightness-[0.3]"
                    sizes="100vw"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-gray-900/90"></div>

                <div className="relative z-10 container mx-auto px-4 max-w-4xl">
                    <div className="flex justify-center mb-6">
                        <Breadcrumbs
                            items={[
                                { label: "Hem", url: "/" },
                                { label: "Artiklar", url: "/artiklar" },
                                { label: article.title.split('–')[0].trim(), url: `/artiklar/${article.slug}` }
                            ]}
                            className="text-gray-300 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full inline-flex"
                        />
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
                        {article.title}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-24 -mt-32 relative z-20">
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2">
                        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            {/* Main Article Image (Unblurred) */}
                            <div className="relative w-full h-[300px] md:h-[400px]">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                                    priority
                                />
                            </div>

                            <div className="p-8 md:p-12">
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
                                    <span className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">M</div>
                                        Redaktionen
                                    </span>
                                    <span>•</span>
                                    <span>Uppdaterad 2024</span>
                                </div>

                                <div
                                    className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-xl"
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                />
                            </div>
                        </article>
                    </div>

                    {/* Sidebar Column */}
                    <aside className="lg:col-span-1 space-y-6">
                        {/* Lead Form Widget */}
                        <div className="bg-white p-1 rounded-2xl shadow-lg border border-gray-100 sticky top-4">
                            <LeadForm />
                        </div>

                        {/* Read More Widget */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                Fler lästips
                            </h3>
                            <ul className="space-y-4">
                                {otherArticles.map((item) => (
                                    <li key={item.slug}>
                                        <a href={`/artiklar/${item.slug}`} className="group flex gap-4 items-start">
                                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    sizes="80px"
                                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900 text-sm leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                                                    {item.title.split('–')[0].trim()}
                                                </h4>
                                                <span className="text-xs text-gray-500">Läs artikel &rarr;</span>
                                            </div>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
