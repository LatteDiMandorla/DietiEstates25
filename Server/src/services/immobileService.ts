import { DAOFactory } from "../daos/factory/DAOFactory";
import { ImmobileDAO } from "../daos/interfaces/ImmobileDAO";
import { PrenotazioneDAO } from "../daos/interfaces/PrenotazioneDAO";
import { Immobile } from "../models/ImmobileT";
import { Ricerca } from "../models/RicercaT";

type coordinates = {latMin: number, latMax: number, lonMin: number, lonMax: number};
type center = {lat: number, lon: number};
type pagination = {page?: number, limit?: number, timestamp?: Date};

export class ImmobileService {
    private immobileDAO: ImmobileDAO | undefined;
    private prenotazioneDAO: PrenotazioneDAO | undefined;
    constructor() {
        const factory = new DAOFactory();
        this.immobileDAO = factory.getImmobileDAO(process.env.DAOTYPE || "");
        this.prenotazioneDAO = factory.getPrenotazioneDAO(process.env.DAOTYPE || "");
    }

    public async getById(id: number) : Promise<Immobile> {
        const data = await this.immobileDAO?.findById(id);
        if(data) {
            return data;
        }

        return Promise.reject();
    }

    public async getByIdWithTimes(id: number) : Promise<Immobile> {
        const immobile = await this.immobileDAO?.findById(id);
        if(!immobile || !immobile.Agente) {
            return Promise.reject("Immobile non trovato");
        }
        const orari = await this.prenotazioneDAO?.findByImmobileAgente(id, immobile.Agente.id);
        console.log({...immobile, orari: orari?.map((o) => o.data)})
        return {...immobile, orari: orari?.map((o) => o.data)};
    }
  
    public async getInRange({latMin, latMax, lonMin, lonMax} : coordinates, {page, limit, timestamp = new Date()} : pagination) : Promise<Immobile[]>{
        let data: Immobile[] | undefined;

        const lat = (latMax + latMin) / 2;
        const lon = (lonMax + lonMin) / 2;

        if(page && limit) {
            data = await this.immobileDAO?.findInRangePaginate(latMin, latMax, lonMin, lonMax, lat, lon, page, limit, timestamp.toISOString());
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