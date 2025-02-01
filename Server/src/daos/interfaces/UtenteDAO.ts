import {Utente} from "../../models/UtenteT";

export interface UtenteDAO {
    findById(id: number) : Promise<Utente | undefined>;
    findByEmail(email: string) : Promise<Utente | undefined>;
    create(user: Utente) : Promise<void>;
    updatePassword(id: Utente["id"], newPassowrd: string): Promise<void>;
}