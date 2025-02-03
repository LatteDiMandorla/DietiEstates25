import {Utente} from "../../models/UtenteT";

export interface UtenteDAO {
    findById(id: number) : Promise<Utente | undefined>;
    findByAuth(id: number) : Promise<Utente | undefined>;
    create(user: Utente) : Promise<number>;
    updatePassword(id: Utente["id"], newPassowrd: string): Promise<void>;
}