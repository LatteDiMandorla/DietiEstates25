import { Agente } from "./AgenteT";

export interface Immobile {
    id?: number;
    title: string;
    street: string;
    size: string;
    bathrooms: string;
    locals: string;
    price: string;
    images: string[];
    lat: number;
    lon: number;
    tags?: string[];
    orari?: Date[];
    Agente?: Agente;
}