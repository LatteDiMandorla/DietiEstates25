import {Agente} from "../../models/AgenteT";

export interface AgenteDAO {
    findById(id: number) : Promise<Agente | undefined>;
    findByEmail(email: string) : Promise<Agente | undefined>;
    create(agente: Agente) : Promise<void>;
}