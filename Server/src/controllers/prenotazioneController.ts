import e, { Request, Response } from "express";
import { DAOFactory } from "../daos/factory/DAOFactory";
import { ImmobileDAO } from "../daos/interfaces/ImmobileDAO";
import { ImmobileService } from "../services/immobileService";
import { UtenteService } from "../services/utenteService";
import { PrenotazioneService } from "../services/prenotazioneService";
import { MailService } from "../services/interfaces/mailService";
import { ServiceFactory } from "../services/factory/serviceFactory";
import { Prenotazione } from "../models/PrenotazioneT";
import { AgenteService } from "../services/agenteService";

export class PrenotazioneController {
    private prenotazioneService : PrenotazioneService;
    private agenteService : AgenteService;
    private utenteService : UtenteService;
    private mailService : MailService | undefined;

    constructor() {
        this.prenotazioneService = new PrenotazioneService()!;
        this.agenteService = new AgenteService()!;
        this.utenteService = new UtenteService()!;
        const serviceFactory = new ServiceFactory();
        this.mailService = serviceFactory.getMailService(process.env.MAIL_API || "");
    }

    public async getById(req : Request, res : Response) : Promise<void> {
        try {
            const id : number = parseInt(req.params.id);
            if(!id) {
                res.status(400).send("Id not valid"); 
                return;
            }
    
            const data = await this.prenotazioneService?.getPrenotazioneById(id);
            res.json(data);
        } catch (error) {
            res.status(400).send(error);
        }
    }


    public async insertPrenotazione(req : Request, res: Response) : Promise<void> {
        try {            
            const {immobileId, data} = req.body;
            const utenteId = res.locals.id;
            if(!utenteId || !immobileId || !data || typeof utenteId !== "number" || typeof immobileId !== "number") {
                res.status(400).send("Body not valid"); 
                return;
            }
    
            await this.prenotazioneService?.insertPrenotazione({data} as Prenotazione, immobileId);
            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async insertUtentePrenotazione(req : Request, res: Response) : Promise<void> {
        try {            
            const {immobileId, data} = req.body;
            const utenteId = res.locals.id;
            if(!immobileId || typeof immobileId !== "number" || !data) {
                res.status(400).send("Body not valid"); 
                return;
            }
            const utente = await this.utenteService?.getUtenteByAuth(utenteId);
            
            await this.prenotazioneService.updatePrenotazioneUtente(data, immobileId, utente.id);
            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}