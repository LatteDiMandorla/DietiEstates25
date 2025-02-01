import { DAOFactory } from "../daos/factory/DAOFactory";
import { AgenziaDAO } from "../daos/interfaces/AgenziaDAO";
import { AmministrazioneDAO } from "../daos/interfaces/AmministrazioneDAO";
import { RicercaDAO } from "../daos/interfaces/RicercaDAO";
import { UtenteDAO } from "../daos/interfaces/UtenteDAO";
import { Ricerca } from "../models/RicercaT";
import { Utente } from "../models/UtenteT";

export class AgenziaService {
    private agenziaDAO: AgenziaDAO | undefined;
    constructor() {
        const factory = new DAOFactory();
        this.agenziaDAO = factory.getAgenziaDAO(process.env.DAOTYPE || "");
    }
  
    public async getAgenziaByAmministrazione(id: number) : Promise<Utente>{
        const data = await this.agenziaDAO?.findByAmministrazione(id);
        console.log(data);
        return data || Promise.reject("Agenzia non trovata"); 
    }
}