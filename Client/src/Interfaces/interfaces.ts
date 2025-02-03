export interface Immobile {
    id?: number,
    title: string;
    street: string;
    size: string;
    bathrooms: number;
    locals: number;
    agentImage: string; 
    price: number;
    images: string[];
    lat: number;
    lon: number;
    tags?: string[];
    orari?: string[]
}

export interface Filters {
    type: string[];
    price: [number | undefined, number | undefined] | [];
    size: [number | undefined, number | undefined] | [];
    locals: [number | undefined, number | undefined] | [];
    bathrooms: string;
    others: string[];
}

export interface ReviewComponents
{
    UserImage?: string;
    TotalPoint: number;
    NameAndSurname: string;
    ReviewTitle: string;
    Text: string;
}

export interface Utente {
    email?: string;
    username?: string;
    nome?: string;
    cognome?: string;
    image?: string;
    accessToken?: string,
    ruolo?: "UTENTE" | "SUPPORTO" | "GESTORE" | "AGENTE",
}