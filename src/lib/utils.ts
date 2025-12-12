
export function slufigy(text: string): string {
    return text
        .toString()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
}

export function parseNumber(str: string): number {
    return parseInt(str.replace(/\s/g, ''), 10) || 0;
}
