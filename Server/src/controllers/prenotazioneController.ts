import { Request, Response } from "express";
import { UtenteService } from "../services/utenteService";
import { PrenotazioneService } from "../services/prenotazioneService";
import { MailService } from "../services/interfaces/mailService";
import { ServiceFactory } from "../services/factory/serviceFactory";
import { Prenotazione } from "../models/PrenotazioneT";
import { AgenteService } from "../services/agenteService";

export class PrenotazioneController {
    private readonly prenotazioneService : PrenotazioneService;
    private readonly utenteService : UtenteService;
    private readonly agenteService : AgenteService;

    constructor(prenotazioneService : PrenotazioneService, utenteService : UtenteService, agenteService : AgenteService) {
        this.prenotazioneService = prenotazioneService;
        this.utenteService = utenteService;
        this.agenteService = agenteService
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

    public async acceptAgentePrenotazione(req : Request, res: Response) : Promise<void> {
        try {            
            const {prenotazioneId} = req.body;
            const agenteId = res.locals.id;
            if(!prenotazioneId || typeof prenotazioneId !== "number") {
                res.status(400).send("Body not valid"); 
                return;
            }
            
            await this.prenotazioneService.acceptPrenotazione(prenotazioneId);
            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async getByUser(req: Request, res: Response) : Promise<void> {
        try {            
            const role = res.locals.ruolo;
            const id = res.locals.id;
            if(!role) {
                res.status(400).send("Role not valid"); 
                return;
            }

            let prenotazioni;
            if(role == "AGENTE") {
                const agente = await this.agenteService.getAgenteByAuth(id);
                prenotazioni = await this.prenotazioneService.getPrenotazioneByAgente(agente);
            } else if (role == "CLIENTE") {
                const utente = await this.utenteService.getUtenteByAuth(id);
                prenotazioni = await this.prenotazioneService.getPrenotazioneByUtente(utente);
            }
            
            res.json(prenotazioni);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}