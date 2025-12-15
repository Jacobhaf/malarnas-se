"use client";

import { useQuoteModal } from "@/components/providers/QuoteModalProvider";

interface RequestQuoteButtonProps {
    className?: string;
    text?: string;
    variant?: "primary" | "secondary";
}

export default function RequestQuoteButton({
    className = "",
    text = "Begär offert",
    variant = "primary"
}: RequestQuoteButtonProps) {
    const { openModal } = useQuoteModal();

    const baseStyles = "font-bold rounded-lg transition-colors text-center inline-block cursor-pointer";
    const variantStyles = variant === "primary"
        ? "bg-blue-600 hover:bg-blue-700 text-white"
        : "bg-gray-100 hover:bg-gray-200 text-gray-900";

    const combinedClassName = `${baseStyles} ${variantStyles} ${className}`;

    return (
        <button
            onClick={openModal}
            className={combinedClassName}
        >
            {text}
        </button>
    );
}
