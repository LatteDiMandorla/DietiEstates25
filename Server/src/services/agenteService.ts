import { DAOFactory } from "../daos/factory/DAOFactory";
import { AgenteDAO } from "../daos/interfaces/AgenteDAO";
import { Agente } from "../models/AgenteT";
import { Ricerca } from "../models/RicercaT";

export class AgenteService {
    private agenteDAO: AgenteDAO;
    constructor() {
        const factory = new DAOFactory();
        this.agenteDAO = factory.getAgenteDAO(process.env.DAOTYPE || "")!;
    }

    public async getAgenteByAuth(id: number){
        const data = await this.agenteDAO.findByAuth(id);
        return data || Promise.reject("Agente non trovato");
    }
  
    public async register(agente: Agente) {
        await this.agenteDAO.create(agente);
    }
}