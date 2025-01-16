import {Immobile} from "../../models/ImmobileT";

export interface ImmobileDAO {
    findById(id: number) : Promise<Immobile>;
    findInRange(minLat: number, maxLat: number, minLon: number, maxLon: number) : Promise<Immobile[]>;
}