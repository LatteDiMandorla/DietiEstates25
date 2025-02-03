import { Agenzia } from "./AgenziaT";
import { Auth } from "./AuthT";

export interface Agente {
    id: number,
    AuthId: Auth["id"],
    nome: string,
    cognome: string,
    image?: string;
    biografia?: string;
    Agenzia: Agenzia;
}