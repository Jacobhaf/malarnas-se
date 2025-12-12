
export function slufigy(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[åä]/g, 'a')
        .replace(/[ö]/g, 'o')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
}

export function parseNumber(str: string): number {
    return parseInt(str.replace(/\s/g, ''), 10) || 0;
}
