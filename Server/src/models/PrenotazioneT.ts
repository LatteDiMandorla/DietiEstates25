import { Agente } from "./AgenteT";
import { Immobile } from "./ImmobileT";
import { Utente } from "./UtenteT";

export interface Prenotazione {
    id?: number;
    data: Date,
    stato: "Disponibile" | "Richiesta" | "Prenotata" | "Effettuata",
    utente?: Utente,
    immobile?: Immobile,
    agente?: Agente,
}