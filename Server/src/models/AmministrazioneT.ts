import { Agenzia } from "./AgenziaT";

export interface Amministrazione {
    id?: number;
    email?: string;
    password?: string;
    ruolo?: "GESTORE" | "SUPPORTO";
    nome?: string,
    cognome?: string,
    Agenzia?: Agenzia;
}