import { AgenteDAO } from "../daos/interfaces/AgenteDAO";
import { Agente } from "../models/AgenteT";

export class AgenteService {
    private agenteDAO: AgenteDAO;
    constructor(agenteDAO: AgenteDAO) {
        this.agenteDAO = agenteDAO;
    }

    public async getAgenteByAuth(id: number){
        const data = await this.agenteDAO.findByAuth(id);
        return data ?? Promise.reject("Agente non trovato");
    }

    public async getByImmobile(id: number){
        const data = await this.agenteDAO.findByImmobile(id);
        return data ?? Promise.reject("Agente non trovato");
    }
  
    public async register(agente: Agente) {
        await this.agenteDAO.create(agente);
    }
}