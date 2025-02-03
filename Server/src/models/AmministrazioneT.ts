import { Agenzia } from "./AgenziaT";
import { Auth } from "./AuthT";

export interface Amministrazione {
    id: number,
    nome: string,
    cognome: string,
    ruolo: "GESTORE" | "SUPPORTO",
    Agenzia: Agenzia,
    AuthId: Auth["id"],
}