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

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-[#102a43] text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20 z-0"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <Breadcrumbs
                        items={[
                            { label: "Hem", url: "/" },
                            { label: "Artiklar", url: "/artiklar" }, // Ideally we have an index, but for now it's just a path
                            { label: article.title.split('–')[0].trim(), url: `/artiklar/${article.slug}` }
                        ]}
                        className="mb-8 text-gray-300"
                    />
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 max-w-4xl">{article.title}</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <article className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            <div
                                className="prose prose-lg max-w-none prose-headings:text-[#102a43] prose-a:text-blue-600"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />
                        </article>
                    </div>

                    <aside className="lg:col-span-1 space-y-8">
                        <div className="sticky top-8">
                            <LeadForm />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
