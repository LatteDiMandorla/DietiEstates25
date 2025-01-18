import { DAOFactory } from "../daos/factory/DAOFactory";
import { ImmobileDAO } from "../daos/interfaces/ImmobileDAO";
import { RicercaDAO } from "../daos/interfaces/RicercaDAO";
import { Immobile } from "../models/ImmobileT";
import { Ricerca } from "../models/RicercaT";

export class ImmobileService {
    private immobileDAO: ImmobileDAO | undefined;
    constructor() {
        const factory = new DAOFactory();
        this.immobileDAO = factory.getImmobileDAO(process.env.DAOTYPE || "");
    }
  
    public async getInRange(neLat: number, neLon: number, swLat: number, swLon: number) : Promise<Immobile[]>{
        const data = await this.immobileDAO?.findInRange(swLat, neLat, swLon, neLon);
        const centerLat = (neLat + swLat) / 2;
        const centerLon = (neLon + swLon) / 2;
        const distanceData = data?.map((imm) => ({...imm, distance: Math.sqrt(Math.pow(imm.lat - centerLat, 2) + Math.pow(imm.lon - centerLon, 2))}));
        return distanceData?.sort((a, b) => (a.distance - b.distance)) || [];
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
                const immobiliInRange = await this.immobileDAO?.findInRange(latMin, latMax, lonMin, lonMax);
                immobiliInRange && (immobili = [...immobili, ...immobiliInRange]);
            }

            return immobili;
        }

        return Promise.reject();
    }
}