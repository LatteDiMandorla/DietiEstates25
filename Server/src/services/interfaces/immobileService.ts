import { Immobile } from "../../models/ImmobileT";

export interface MapService {
    getInRange(neLat: number, neLon: number, swLat: number, swLon: number) : Promise<Immobile[]>;
}