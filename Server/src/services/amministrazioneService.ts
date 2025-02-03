import { DAOFactory } from "../daos/factory/DAOFactory";
import { AgenziaDAO } from "../daos/interfaces/AgenziaDAO";
import { AmministrazioneDAO } from "../daos/interfaces/AmministrazioneDAO";
import { Agenzia } from "../models/AgenziaT";
import { Amministrazione } from "../models/AmministrazioneT";

export class AmministrazioneService {
    private amministrazioneDAO: AmministrazioneDAO;
    private agenziaDAO: AgenziaDAO;
    constructor() {
        const factory = new DAOFactory();
        this.amministrazioneDAO = factory.getAmministrazioneDAO(process.env.DAOTYPE || "")!;
        this.agenziaDAO = factory.getAgenziaDAO(process.env.DAOTYPE || "")!;
    }
  
    public async getAllFromAgenzia(id: number) : Promise<Amministrazione[]>{
        const data = await this.amministrazioneDAO?.findAllByAgenzia(id);
        console.log(data);
        return data || Promise.reject("Agenzia non trovata"); 
    }

    public async getAgenziaFromId(id: number) : Promise<Agenzia> {
        const data = await this.agenziaDAO.findByAmministrazione(id);
        return data || Promise.reject("Agenzia non trovata");
    }

    public async getAmministratoreByAuth(id: number){
        const data = await this.amministrazioneDAO.findByAuth(id);
        return data || Promise.reject("Amministratore non trovato");
    }

    public async register(amministratore: Amministrazione) : Promise<Amministrazione> {
        const id = await this.amministrazioneDAO.create(amministratore);
        return {...amministratore, id: id};
    }
}