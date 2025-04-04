import { ImmobileDAO } from "../daos/interfaces/ImmobileDAO";
import { PrenotazioneDAO } from "../daos/interfaces/PrenotazioneDAO";
import { Immobile } from "../models/ImmobileT";
import { Ricerca } from "../models/RicercaT";

type coordinates = {latMin: number, latMax: number, lonMin: number, lonMax: number};
type center = {lat: number, lon: number};
type pagination = {page?: number, limit?: number, timestamp?: Date};

export class ImmobileService {
    private readonly immobileDAO: ImmobileDAO;
    private readonly prenotazioneDAO: PrenotazioneDAO;
    constructor(immobileDAO: ImmobileDAO, prenotazioneDAO: PrenotazioneDAO) {
        this.immobileDAO = immobileDAO;
        this.prenotazioneDAO = prenotazioneDAO;
    }

    public async getById(id: number) : Promise<Immobile> {
        const data = await this.immobileDAO?.findById(id);
        if(data) {
            return data;
        }

        return Promise.reject(new Error());
    }

    public async getByIdWithTimes(id: number) : Promise<Immobile> {
        const immobile = await this.immobileDAO?.findById(id);
        if(!immobile?.Agente) {
            return Promise.reject(new Error("Immobile non trovato"));
        }
        const orari = await this.prenotazioneDAO?.findByImmobileAgente(id, immobile.Agente.id);
        console.log({...immobile, orari: orari?.map((o) => o.data)})
        return {...immobile, orari: orari?.map((o) => o.data)};
    }
  
    public async getInRange({latMin, latMax, lonMin, lonMax} : coordinates, {page, limit, timestamp = new Date()} : pagination) : Promise<Immobile[]>{
        let data: Immobile[] | undefined;

        if(latMin > latMax || lonMin > lonMax){
            return Promise.reject(new Error("Bounds non validi"));
        }

        if(page && page < 0){
            return Promise.reject(new Error("Paginazione negativa"));
        }

        if(limit && limit < 0){
            return Promise.reject(new Error("Dimensione pagina negativa"));
        }

        const lat = (latMax + latMin) / 2;
        const lon = (lonMax + lonMin) / 2;

        if(page && limit) {
            data = await this.immobileDAO?.findInRangePaginate(latMin, latMax, lonMin, lonMax, lat, lon, page, limit, timestamp.toISOString());
        } else {
            data = await this.immobileDAO?.findInRange(latMin, latMax, lonMin, lonMax, lat, lon);
        }
        return data || [];
    }

    public calculateBounds(lat: number, lon: number, radiusKm: number) {
        if(lat > 90 || lat < -90) {
            throw new Error("Invalid Latitude");
        }

        if(lon > 180 || lon < -180) {
            throw new Error("Invalid Longitude");
        }

        if(radiusKm < 0) {
            throw new Error("Invalid Radius");
        }

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
                if(!r?.lat || !r?.lon){
                    continue;
                }
                const {latMin, latMax, lonMin, lonMax} = this.calculateBounds(r.lat, r.lon, 5);
                const immobiliInRange = await this.immobileDAO?.findInRange(latMin, latMax, lonMin, lonMax, r.lat, r.lon);
                immobiliInRange && (immobili = [...immobili, ...immobiliInRange]);
            }

            return immobili;
        }

        return Promise.reject(new Error());
    }
}