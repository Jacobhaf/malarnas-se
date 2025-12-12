
export interface Location {
    kommun: string;
    folkMangd: number;
    lan: string;
}

export interface Company {
    name: string;
    orgNr: string;
    type: string;
    address: string;
    zip: string;
    city: string;
    phone: string;
    website: string;
    email: string;
    registrationDate: string;
}

export interface Breadcrumb {
    label: string;
    url: string;
}
