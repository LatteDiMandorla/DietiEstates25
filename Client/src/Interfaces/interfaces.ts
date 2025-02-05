export interface Immobile {
    id: number;
    title: string;
    description: string;
    street: string;
    size: number;
    bathrooms: number;
    locals: number;
    price: number;
    efficienza: string;
    type: "AFFITTO" | "VENDITA"; 
    images: string[];
    lat: number;
    lon: number;
    tags: string[];
    orari?: Date[];
    Agente?: Agente;
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
    biografia?: string,
    ruolo?: "CLIENTE" | "SUPPORTO" | "GESTORE" | "AGENTE",
}

export interface Agente {
    id: number,
    nome: string,
    cognome: string,
    image?: string;
    biografia?: string;
}