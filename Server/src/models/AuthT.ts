import { Agente } from "./AgenteT";
import { Amministrazione } from "./AmministrazioneT";
import { Utente } from "./UtenteT";

export interface Auth {
    id: number,
    email: string,
    password?: string,
    verified: boolean,
    ruolo: Role,
    info?: Utente | Agente | Amministrazione
}

export type Role = "CLIENTE" | "AGENTE" | "GESTORE" | "SUPPORTO";