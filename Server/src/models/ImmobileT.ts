import { Agente } from "./AgenteT";

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
    type: ImmobileType;
    images: string[];
    lat: number;
    lon: number;
    tags: string[];
    orari?: Date[];
    Agente?: Agente;
}

export type ImmobileType = "AFFITTO" | "VENDITA";