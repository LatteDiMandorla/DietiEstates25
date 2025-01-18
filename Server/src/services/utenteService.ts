import { DAOFactory } from "../daos/factory/DAOFactory";
import { RicercaDAO } from "../daos/interfaces/RicercaDAO";
import { UtenteDAO } from "../daos/interfaces/UtenteDAO";
import { Ricerca } from "../models/RicercaT";
import { Utente } from "../models/UtenteT";

export class UtenteService {
    private utenteDAO: UtenteDAO | undefined;
    private ricercaDAO: RicercaDAO | undefined;
    constructor() {
        const factory = new DAOFactory();
        this.utenteDAO = factory.getUtenteDAO(process.env.DAOTYPE || "");
        this.ricercaDAO = factory.getRicercaDAO(process.env.DAOTYPE || "");
    }
  
    public async getUtenteById(id: number) : Promise<Utente>{
        const data = await this.utenteDAO?.findById(id);
        return data || Promise.reject(); 
    }

    public async getSearchesUtente(id: number) : Promise<Ricerca[]>{
        const data = await this.ricercaDAO?.findLatest(id);
        return data || Promise.reject();
    }

    public async insertSearches(utenteId: number, searches: Ricerca[]) : Promise<void>{
        await this.ricercaDAO?.removeOfUser(utenteId);
        await this.ricercaDAO?.createOfUser(utenteId, searches);
    }
}