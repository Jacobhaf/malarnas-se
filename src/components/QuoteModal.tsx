
"use client";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
    PaintRoller,
    Paintbrush,
    Scroll,
    Home,
    Layers,
    Palette,
    X,
    MapPin,
    User,
    Phone,
    Mail
} from "lucide-react";

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<string>("");
    const [submitted, setSubmitted] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        zip: "",
        city: "",
        phone: "",
        email: ""
    });

    const services = [
        { id: "inomhus", label: "Inomhusmålning", icon: PaintRoller },
        { id: "utomhus", label: "Utomhusmålning", icon: Paintbrush },
        { id: "tapetsering", label: "Tapetsering", icon: Scroll },
        { id: "fasad", label: "Fasadmålning", icon: Home },
        { id: "lackering", label: "Lackering av kök/möbler", icon: Layers },
        { id: "annat", label: "Annat", icon: Palette },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
        }, 500);
    };

    const handleServiceSelect = (id: string) => {
        setSelectedService(id);
        // Optional: Auto scroll or highlight? 
        // The design shows everything in one view or steps? 
        // The image shows the form fields BELOW the grid. So it's all one step.
    };

    if (submitted) {
        return (
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[100]" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all relative">
                                    <button
                                        onClick={onClose}
                                        className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>

                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Tack för din förfrågan!</h3>
                                        <p className="text-gray-600 mb-6">
                                            Vi har mottagit dina uppgifter. Du kommer snart bli kontaktad av upp till 5 målerifirmor med prisförslag.
                                        </p>
                                        <button
                                            onClick={onClose}
                                            className="bg-[#d93025] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#b0221a] transition-colors"
                                        >
                                            Stäng fönstret
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        );
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all relative">

                                {/* Head Banner (Red Bar for aesthetics? No, clean white based on image, maybe red submit button implies red theme) 
                   The image has a red side bar. I will just do a clean modal for now, or add a red left border.
                   Let's stick to clean white as it's a modal.
               */}

                                <button
                                    onClick={onClose}
                                    className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors z-10"
                                >
                                    <X size={24} />
                                </button>

                                <div className="p-8">
                                    <Dialog.Title as="h3" className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center pt-2">
                                        Jämför 5st kostnadsfria offerter
                                    </Dialog.Title>

                                    <form onSubmit={handleSubmit}>
                                        {/* Service Selection */}
                                        <div className="mb-8">
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Vad behöver du hjälp med?
                                            </label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {services.map((service) => {
                                                    const Icon = service.icon;
                                                    const isSelected = selectedService === service.id;
                                                    return (
                                                        <button
                                                            key={service.id}
                                                            type="button"
                                                            onClick={() => handleServiceSelect(service.id)}
                                                            className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${isSelected
                                                                    ? "border-[#d93025] bg-red-50 text-[#d93025] ring-1 ring-[#d93025]"
                                                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                                                                }`}
                                                        >
                                                            <Icon size={20} strokeWidth={1.5} className={isSelected ? "text-[#d93025]" : "text-gray-500"} />
                                                            <span className="font-medium text-sm">{service.label}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Text Fields */}
                                        <div className="space-y-4 mb-8">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                    Fullständigt namn <span className="text-[#d93025]">*</span>
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#d93025] focus:border-[#d93025] outline-none transition-all bg-gray-50/50"
                                                        placeholder=""
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
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#d93025] focus:border-[#d93025] outline-none transition-all bg-gray-50/50"
                                                        value={formData.address}
                                                        onChange={handleInputChange}
                                                    />
                                                    <MapPin className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                        Postnummer <span className="text-[#d93025]">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="zip"
                                                        required
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#d93025] focus:border-[#d93025] outline-none transition-all bg-gray-50/50"
                                                        value={formData.zip}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                        Ort <span className="text-[#d93025]">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        required
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#d93025] focus:border-[#d93025] outline-none transition-all bg-gray-50/50"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                        Telefonnummer <span className="text-[#d93025]">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            required
                                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#d93025] focus:border-[#d93025] outline-none transition-all bg-gray-50/50"
                                                            value={formData.phone}
                                                            onChange={handleInputChange}
                                                        />
                                                        <Phone className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                        E-postadress <span className="text-[#d93025]">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            required
                                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#d93025] focus:border-[#d93025] outline-none transition-all bg-gray-50/50"
                                                            value={formData.email}
                                                            onChange={handleInputChange}
                                                        />
                                                        <Mail className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-[#d93025] hover:bg-[#b0221a] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                                        >
                                            Skicka in
                                        </button>

                                        <p className="text-xs text-gray-400 text-center mt-6">
                                            Vi följer GDPR och har en integritetspolicy som du kan läsa under våra villkor. Kontakta oss om du vill veta mer.
                                        </p>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
