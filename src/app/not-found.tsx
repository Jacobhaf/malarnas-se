
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sidan hittades inte</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Tyvärr kunde vi inte hitta sidan du letade efter. Det kan bero på att sidan har flyttats eller tagits bort.
                </p>
                <Link
                    href="/"
                    className="bg-primary hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full transition-colors inline-block"
                >
                    Gå till startsidan
                </Link>
            </div>
        </div>
    );
}
