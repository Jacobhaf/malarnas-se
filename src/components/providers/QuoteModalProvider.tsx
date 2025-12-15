"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import QuoteModal from "@/components/QuoteModal";

interface QuoteModalContextType {
    openModal: () => void;
    closeModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

export function useQuoteModal() {
    const context = useContext(QuoteModalContext);
    if (!context) {
        throw new Error("useQuoteModal must be used within a QuoteModalProvider");
    }
    return context;
}

export function QuoteModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <QuoteModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <QuoteModal isOpen={isOpen} onClose={closeModal} />
        </QuoteModalContext.Provider>
    );
}
