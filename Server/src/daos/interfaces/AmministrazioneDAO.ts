import {Amministrazione} from "../../models/AmministrazioneT";

export interface AmministrazioneDAO {
    findAllByAgenzia(id: number) : Promise<Amministrazione[]>;
    findGestoreByAgenzia(id: number) : Promise<Amministrazione | undefined>;
    findByEmail(email: string) : Promise<Amministrazione | undefined>;
    findById(id: Amministrazione["id"]): Promise<Amministrazione | undefined>;
    create(agente: Amministrazione) : Promise<void>;
    updatePassword(id: Amministrazione["id"], newPassowrd: string): Promise<void>;
}