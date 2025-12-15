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
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Få offerter från målare
            </h3>
            <p className="text-gray-600 mb-8 text-center text-sm">
                Beskriv ditt projekt och jämför priser helt kostnadsfritt.
            </p>

            <form onSubmit={handleSubmit}>
                {/* Service Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Vad behöver du hjälp med?
                    </label>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2"> {/* Responsive: 2 cols on mobile/sidebar, 3 on larger widths if space permits */}
                        {services.map((service) => {
                            const Icon = service.icon;
                            const isSelected = selectedService === service.id;
                            return (
                                <button
                                    key={service.id}
                                    type="button"
                                    onClick={() => handleServiceSelect(service.id)}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all h-full justify-center ${isSelected
                                        ? "border-blue-600 bg-blue-50 text-blue-600 ring-1 ring-blue-600"
                                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                                        }`}
                                >
                                    <Icon size={20} strokeWidth={1.5} className={isSelected ? "text-blue-600" : "text-gray-500"} />
                                    <span className="font-medium text-xs">{service.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Text Fields */}
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Fullständigt namn <span className="text-blue-600">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-gray-50/50"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            <User className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Adress
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="address"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-gray-50/50"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                            <MapPin className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Postnr <span className="text-blue-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="zip"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-gray-50/50"
                                value={formData.zip}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Ort <span className="text-blue-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="city"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-gray-50/50"
                                value={formData.city}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Telefon <span className="text-blue-600">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-gray-50/50"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                                <Phone className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                E-post <span className="text-blue-600">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-gray-50/50"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                <Mail className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Övrig information
                        </label>
                        <textarea
                            name="message"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-gray-50/50 h-24 resize-none"
                            placeholder="Beskriv ditt projekt mer detaljerat..."
                            value={formData.message}
                            onChange={(e: any) => handleInputChange(e)}
                        ></textarea>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                    Skicka in
                </button>

                <p className="text-xs text-gray-400 text-center mt-4">
                    Genom att klicka godkänner du våra villkor. Tjänsten är inte bindande.
                </p>
            </form>
        </div>
    );
}
