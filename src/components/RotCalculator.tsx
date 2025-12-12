
"use client";

import { useState } from "react";

export default function RotCalculator() {
    const [cost, setCost] = useState<number>(50000);
    const ROT_PERCENTAGE = 0.3; // 30%
    const MAX_ROT = 50000; // Max per person per year (simplified)

    const laborCost = Math.round(cost * 0.7); // Assume 70% is labor
    const materialCost = cost - laborCost;
    const rotDeduction = Math.min(laborCost * ROT_PERCENTAGE, MAX_ROT);
    const totalCost = cost - rotDeduction;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Räkna ut ditt ROT-avdrag</h3>
            <p className="text-gray-600 mb-6">
                Se hur mycket du kan spara på din måleri genom att använda ROT-avdraget.
            </p>

            <div className="mb-8">
                <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-2">
                    Ungefärlig totalkostnad (kr)
                </label>
                <input
                    type="range"
                    id="cost"
                    min="10000"
                    max="200000"
                    step="1000"
                    value={cost}
                    onChange={(e) => setCost(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="mt-2 text-right font-semibold text-xl text-primary">
                    {cost.toLocaleString()} kr
                </div>
            </div>

            <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Arbetskostnad (est. 70%)</span>
                    <span>{laborCost.toLocaleString()} kr</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Materialkostnad (est. 30%)</span>
                    <span>{materialCost.toLocaleString()} kr</span>
                </div>
                <div className="flex justify-between text-base font-medium text-secondary">
                    <span>Ditt ROT-avdrag</span>
                    <span>-{rotDeduction.toLocaleString()} kr</span>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Att betala</span>
                    <span>{totalCost.toLocaleString()} kr</span>
                </div>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
                * Detta är en uppskattning. Arbetskostnaden varierar beroende på projekt. ROT-avdraget är max 50 000 kr per person och år.
            </p>
        </div>
    );
}
