import { DAOFactory } from "../daos/factory/DAOFactory";
import { ImmobileDAO } from "../daos/interfaces/ImmobileDAO";
import { RicercaDAO } from "../daos/interfaces/RicercaDAO";
import { Immobile } from "../models/ImmobileT";
import { Ricerca } from "../models/RicercaT";

type coordinates = {neLat: number, neLon: number, swLat: number, swLon: number};
type center = {lat: number, lon: number};
type pagination = {page?: number, limit?: number, timestamp: string};
export class ImmobileService {
    private immobileDAO: ImmobileDAO | undefined;
    constructor() {
        const factory = new DAOFactory();
        this.immobileDAO = factory.getImmobileDAO(process.env.DAOTYPE || "");
    }
  
    public async getInRange({lat, lon} : center, {page, limit, timestamp} : pagination) : Promise<Immobile[]>{
        let data: Immobile[] | undefined;

        const {latMin, latMax, lonMin, lonMax} = this.calculateBounds(lat, lon, 5); 
        if(page && limit) {
            data = await this.immobileDAO?.findInRangePaginate(latMin, latMax, lonMin, lonMax, lat, lon, page, limit, timestamp);
        } else {
            data = await this.immobileDAO?.findInRange(latMin, latMax, lonMin, lonMax, lat, lon);
        }
        return data || [];
    }

    private calculateBounds(lat: number, lon: number, radiusKm: number) {
        const earthRadiusKm = 6371; // Raggio della Terra in km
        const latDelta = radiusKm / 111; // Delta latitudine in gradi
        const lonDelta = radiusKm / (111 * Math.cos((lat * Math.PI) / 180)); // Delta longitudine in gradi
      
        const latMin = lat - latDelta;
        const latMax = lat + latDelta;
        const lonMin = lon - lonDelta;
        const lonMax = lon + lonDelta;
      
        return {
          latMin,
          latMax,
          lonMin,
          lonMax,
        };
      }

    public async getFromRecentSearches(searches: Ricerca[]) : Promise<Immobile[]> {
        let immobili : Immobile[] = [];
        if(searches && searches.length > 0){
            for(let i : number = 0; i < (searches.length || 0); i++) {
                const r: Ricerca = searches[i];
                if(!r || !r.lat || !r.lon){
                    continue;
                }
                const {latMin, latMax, lonMin, lonMax} = this.calculateBounds(r.lat, r.lon, 5);
                const immobiliInRange = await this.immobileDAO?.findInRange(latMin, latMax, lonMin, lonMax, r.lat, r.lon);
                immobiliInRange && (immobili = [...immobili, ...immobiliInRange]);
            }

            return immobili;
        }

        return Promise.reject();
    }
}