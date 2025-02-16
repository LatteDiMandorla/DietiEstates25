import { Ricerca } from "../../models/RicercaT";

export interface RicercaDAO {
    findLatest(userId: number) : Promise<Ricerca[]>;
    removeOfUser(userId: number) : Promise<void>;
    createOfUser(userId: number, searches: Ricerca[]) : Promise<void>;
}