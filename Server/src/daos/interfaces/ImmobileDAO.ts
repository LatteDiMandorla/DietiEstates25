import {Immobile} from "../../models/ImmobileT.js";

export interface ImmobileDAO {
    findById(id: number) : Promise<Immobile>;
    findInRange(minLat: number, maxLat: number, minLon: number, maxLon: number) : Promise<Immobile[]>;
}