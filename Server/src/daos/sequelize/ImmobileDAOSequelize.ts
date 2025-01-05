import { ImmobileDAO } from "../interfaces/ImmobileDAO";
import {Immobile} from "../../models/ImmobileT";
import { Immobili } from "../../controllers/immobili";

export class ImmobileDAOSequelize implements ImmobileDAO {
    public async findById(id: number): Promise<Immobile> {
        return Immobili[0];
    }

    findInRange(minLat: number, maxLat: number, minLon: number, maxLon: number) : Promise<Immobile[]> {
        return Promise.resolve(Immobili.filter((imm) => (imm.lat <= maxLat && imm.lat >= minLat && imm.lon >= minLon && imm.lon <= maxLon)));
    }
}