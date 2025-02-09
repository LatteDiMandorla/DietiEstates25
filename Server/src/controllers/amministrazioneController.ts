import { Request, Response } from "express";
import { AmministrazioneService } from "../services/amministrazioneService";
import { AgenziaService } from "../services/agenziaService";

export class AmministrazioneController {
    private amministrazioneService: AmministrazioneService;
    private agenziaService: AgenziaService;

    constructor(amministrazioneService: AmministrazioneService, agenziaService: AgenziaService){
        this.amministrazioneService = amministrazioneService;
        this.agenziaService = agenziaService;
    }

    public async getAllAdmin(req: Request, res: Response){
        const id = res.locals.id;

        if(!id){
            res.status(401).send("Non autorizzato");
            return;
        }

        try {
            const agenzia = await this.agenziaService?.getAgenziaByAmministrazione(id);
            if(!agenzia || !agenzia.id) {
                res.status(400).send("Agenzia non trovata");
                return;
            }

            const admin = await this.amministrazioneService?.getAllFromAgenzia(agenzia.id);
            res.json(admin);
        } catch (error) {
            res.status(400).send(error);
        }

    }
}