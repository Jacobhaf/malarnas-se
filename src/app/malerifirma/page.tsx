
import { getAllCounties } from "@/lib/company-data";
import SwedenMap from "@/components/SwedenMap";
import CountyListCollapsible from "@/components/CountyListCollapsible";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Målare per län - Hela Sverige | Målarnas.se',
    description: 'Hitta en målerifirma i ditt län. Vi listar målare i alla Sveriges län och kommuner.',
    alternates: {
        canonical: '/malerifirma'
    }
};

export default function MalerifirmaIndexPage() {
    const counties = getAllCounties();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <nav className="mb-8 text-sm text-gray-500">
                    <Link href="/" className="hover:underline">Hem</Link> &gt; <span>Målerifirma</span>
                </nav>

                <h1 className="text-4xl font-bold text-gray-900 mb-8">Hitta målare i ditt län</h1>

                <div className="flex flex-col lg:flex-row gap-12 items-start mb-12">
                    <div className="w-full lg:w-1/2">
                        <p className="text-xl text-gray-600 mb-8">
                            Klicka på kartan eller välj ditt län i listan nedan för att se tillgängliga orter och hitta lokala måleriföretag nära dig.
                        </p>
                        <CountyListCollapsible counties={counties} />
                    </div>
                    <div className="w-full lg:w-1/2 flex justify-center bg-gray-50 rounded-2xl p-8 border border-gray-100">
                        <SwedenMap />
                    </div>
                </div>
            </div>
        </div>
    );
}
