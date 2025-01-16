import {Utente} from "../../models/UtenteT";

export interface UtenteDAO {
    findById(id: number) : Promise<Utente>;
}