import { Request, Response } from "express";
import { DAOFactory } from "../daos/factory/DAOFactory";
import { ImmobileDAO } from "../daos/interfaces/ImmobileDAO";
import { Immobili } from "./immobili";
import { ImmobileService } from "../services/immobileService";
import { UtenteService } from "../services/utenteService";

export class UtenteController {
    private utenteService : UtenteService | undefined;

    constructor() {
        this.utenteService = new UtenteService();
    }

    public async getById(req : Request, res : Response) : Promise<void> {
        const id : number = parseInt(req.params.id);
        if(!id) {
            res.status(400).send("Id not valid"); 
            return;
        }

        const data = await this.utenteService?.getUtenteById(id);
        res.json(data);
    }

    public async getRecentSearches(req : Request, res : Response) : Promise<void> {
        const id : number = parseInt(req.query.id as string);
        if(!id) {
            res.status(400).send("Id not valid"); 
            return;
        }

        const data = await this.utenteService?.getSearchesUtente(id);
        res.json(data);
    }

    public async getSelf(req: Request, res: Response) : Promise<void> {
        const id = res.locals.id;

        if(!id) {
            res.status(401).send("Not Verified"); 
            return;
        }

        try {
            const utente = await this.utenteService?.getUtenteById(id);
            res.status(200).json(utente);
        } catch (error) {
            res.status(400).send("User not found"); 
            return
        }
    }

    public async insertRecentSearch(req : Request, res: Response) : Promise<void> {
        const id : number = parseInt(req.query.id as string);
        const {recents} = req.body;
        if(!id) {
            res.status(400).send("Id not valid"); 
            return;
        }

        const data = await this.utenteService?.insertSearches(id, recents);
        res.sendStatus(200);
    }
}