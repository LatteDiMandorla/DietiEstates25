import {Immobile} from "../../models/ImmobileT";

export interface ImmobileDAO {
    findById(id: number) : Promise<Immobile>;
    findInRange(minLat: number, maxLat: number, minLon: number, maxLon: number, lat: number, lon: number) : Promise<Immobile[]>;
    findInRangePaginate(minLat: number, maxLat: number, minLon: number, maxLon: number, lat: number, lon: number, page:number, limit:number, timestamp: string) : Promise<Immobile[]>;
}