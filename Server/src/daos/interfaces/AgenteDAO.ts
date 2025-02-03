import {Agente} from "../../models/AgenteT";

export interface AgenteDAO {
    findById(id: number) : Promise<Agente | undefined>;
    findByAuth(authId: number) : Promise<Agente | undefined>;
    create(agente: Agente) : Promise<void>;
    updatePassword(id: Agente["id"], newPassowrd: string): Promise<void>;
}