import { Auth } from "./AuthT";

export interface Utente {
    id: number,
    AuthId: Auth["id"],
    username: string;
    nome: string;
    cognome: string;
    image?: string;
}