import {Agenzia} from "../../models/AgenziaT";

export interface AgenziaDAO {
    findByAmministrazione(id: number) : Promise<Agenzia | undefined>;
    findById(id: number) : Promise<Agenzia | undefined>;
}