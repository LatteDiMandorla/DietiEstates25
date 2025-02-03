import { DAOFactory } from "../daos/factory/DAOFactory";
import { AgenziaDAO } from "../daos/interfaces/AgenziaDAO";
import { Agenzia } from "../models/AgenziaT";

export class AgenziaService {
    private agenziaDAO: AgenziaDAO;
    constructor() {
        const factory = new DAOFactory();
        this.agenziaDAO = factory.getAgenziaDAO(process.env.DAOTYPE || "")!;
    }
  
    public async getAgenziaByAmministrazione(id: number) : Promise<Agenzia>{
        const data = await this.agenziaDAO.findByAmministrazione(id);
        return data || Promise.reject("Agenzia non trovata"); 
    }

    public async getFromId(id: number) : Promise<Agenzia>{
        const data = await this.agenziaDAO?.findById(id);
        return data || Promise.reject("Agenzia non trovata");
    }
}