"use client";

import { useState } from "react";
import {
    PaintRoller,
    Paintbrush,
    Scroll,
    Home,
    Layers,
    Palette,
    MapPin,
    User,
    Phone,
    Mail
} from "lucide-react";

export default function LeadForm() {
    const [selectedService, setSelectedService] = useState<string>("");
    const [submitted, setSubmitted] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        zip: "",
        city: "",
        phone: "",
        email: "",
        message: ""
    });

    const services = [
        { id: "inomhus", label: "Inomhusmålning", icon: PaintRoller },
        { id: "takmalning", label: "Takmålning", icon: Paintbrush },
        { id: "tapetsering", label: "Tapetsering", icon: Scroll },
        { id: "fasad", label: "Fasadmålning", icon: Home },
        { id: "lackering", label: "Lackering av kök/möbler", icon: Layers },
        { id: "annat", label: "Annat", icon: Palette },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleServiceSelect = (id: string) => {
        setSelectedService(id);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
        }, 500);
    };

    if (submitted) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Tack för din förfrågan!</h3>
                <p className="text-gray-600 mb-6">
                    Vi har mottagit dina uppgifter. Du kommer snart bli kontaktad av upp till 5 målerifirmor med prisförslag.
                </p>
                <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                    Vi hör av oss via telefon elller e-post inom kort.
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#fff9f4] p-6 rounded-2xl shadow-lg border border-orange-100 max-w-xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Betala inte för mycket
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-2">
                    Få en <span className="underline decoration-orange-400 decoration-4 underline-offset-4 decoration-skip-ink">prispressad offert</span> för ditt måleriprojekt på 1 minut
                </h3>
                <p className="text-gray-600 font-medium">Jämför och spara pengar. Lokala proffs - hela Sverige.</p>
            </div>

            {/* "Vi prispressar" Section */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                    <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                        <Layers className="w-6 h-6 text-gray-900" />
                    </div>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-1">Vi prispressar åt dig</h4>
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                        {"★★★★★".split("").map((star, i) => (
                            <span key={i}>{star}</span>
                        ))}
                    </div>
                    <span className="text-sm font-bold text-gray-900">+500 offerter 2025</span>
                </div>

                <div className="space-y-3 text-sm text-gray-700">
                    <p>1. Fyll i några enkla uppgifter om ditt projekt.</p>
                    <p>2. Vi matchar dig med kvalitetssäkrade målerifirmor som erbjuder bäst pris.</p>
                    <p>3. Välj hur du vill gå vidare, <span className="font-bold">utan köptvång!</span></p>
                </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-8">
                {/* Service Selection */}
                <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                        Vad behöver du hjälp med?
                    </label>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                        {services.map((service) => {
                            const Icon = service.icon;
                            const isSelected = selectedService === service.id;
                            return (
                                <button
                                    key={service.id}
                                    type="button"
                                    onClick={() => handleServiceSelect(service.id)}
                                    className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-center transition-all h-full justify-center ${isSelected
                                        ? "border-blue-600 bg-blue-50 text-blue-600 ring-1 ring-blue-600"
                                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                                        }`}
                                >
                                    <Icon size={16} strokeWidth={1.5} className={isSelected ? "text-blue-600" : "text-gray-500"} />
                                    <span className="font-medium text-[11px] leading-tight">{service.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Text Fields */}
                <div className="space-y-3 mb-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                            Fullständigt namn <span className="text-blue-600">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-gray-50/50"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            <User className="absolute left-3 top-2.5 text-gray-400" size={16} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                            Adress
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="address"
                                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-gray-50/50"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                            <MapPin className="absolute left-3 top-2.5 text-gray-400" size={16} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                                Postnr <span className="text-blue-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="zip"
                                required
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-gray-50/50"
                                value={formData.zip}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                                Ort <span className="text-blue-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="city"
                                required
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-gray-50/50"
                                value={formData.city}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                                Telefon <span className="text-blue-600">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-gray-50/50"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                                <Phone className="absolute left-3 top-2.5 text-gray-400" size={16} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                                E-post <span className="text-blue-600">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-gray-50/50"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                <Mail className="absolute left-3 top-2.5 text-gray-400" size={16} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                            Övrig information
                        </label>
                        <textarea
                            name="message"
                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-gray-50/50 h-16 resize-none"
                            placeholder="Beskriv ditt projekt..."
                            value={formData.message}
                            onChange={(e: any) => handleInputChange(e)}
                        ></textarea>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base py-3 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                    Skicka in förfrågan
                </button>

                <p className="text-[10px] text-gray-400 text-center mt-3 leading-tight">
                    Tjänsten är kostnadsfri och ej bindande.
                </p>
            </form>

            {/* Bottom Trust Section */}
            <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 shrink-0">
                    <img
                        src="/images/customer-service.png"
                        alt="Kundservice"
                        className="w-full h-full object-cover rounded-full border-2 border-white shadow-md"
                    />
                </div>
                <div className="space-y-1 text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                        <span className="text-orange-500 font-bold">✓</span> Vi gör jobbet åt dig
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-orange-500 font-bold">✓</span> Inga krav. Inget krångel
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-orange-500 font-bold">✓</span> Måleriarbete på dina villkor
                    </div>
                </div>
            </div>
        </div>
    );
}
