import { DAOFactory } from "../daos/factory/DAOFactory";
import { ImmobileDAO } from "../daos/interfaces/ImmobileDAO";
import { Immobile } from "../models/ImmobileT";

export class ImmobileService {
    private immobileDAO: ImmobileDAO | undefined;
    constructor() {
        const factory = new DAOFactory();
        this.immobileDAO = factory.getImmobileDAO(process.env.DAOTYPE || "");
    }
  
    public async getInRange(neLat: number, neLon: number, swLat: number, swLon: number) : Promise<Immobile[]>{
        const data = await this.immobileDAO?.findInRange(swLat, neLat, swLon, neLon);
        return data || [];
    }
}