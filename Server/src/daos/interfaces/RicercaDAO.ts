import { Ricerca } from "../../models/RicercaT";
import {Utente} from "../../models/UtenteT";

export interface RicercaDAO {
    findLatest(userId: number) : Promise<Ricerca[]>;
}