import { Request, Response } from "express";
import { DAOFactory } from "../daos/factory/DAOFactory";
import { ImmobileDAO } from "../daos/interfaces/ImmobileDAO";
import { Immobili } from "./immobili";
import { ImmobileService } from "../services/immobileService";
import { Ricerca } from "../models/RicercaT";

export class ImmobileController {
    private immobileService : ImmobileService | undefined;

    constructor() {
        this.immobileService = new ImmobileService();
    }

    public async getById(req : Request, res : Response) : Promise<void> {
        const id : number = parseInt(req.params.id);
        if(!id) {
            res.status(400).send("Id not valid"); 
            return;
        }

        res.json("Fatto");
    }

    public async getByRange(req: Request, res: Response) : Promise<void> {
        const { lat, lon } = req.query;
        if (!lat || typeof lat !== 'string' || !parseFloat(lat) || !lon || typeof lon !== 'string' || !parseFloat(lon)) {
            res.status(400).json({ error: 'The query parameters are required and must be numbers.' });
            return;
        }

        const {page, limit, sort, order} = req.query;
        if ((page && !parseInt(page as string)) || (limit && !parseInt(limit as string))) {
            res.status(400).json({ error: 'The query pagination parameters must be numbers.' });
            return;
        }

        const {timestamp} = req.query;
        if(timestamp && typeof timestamp == "string"){
            res.status(400).json({ error: 'Wrong timestamp type' });
            return;
        }

        const data = await this.immobileService?.getInRange({lat: parseFloat(lat), lon: parseFloat(lon)}, {page: parseInt(page as string), limit: parseInt(limit as string), timestamp: (timestamp as string) || new Date().toISOString()});
        res.json({data, timestamp});
    }

    public async getFromRecentSearches(req: Request, res: Response) : Promise<void> {
        try {
            const {recents} = req.body;
            if(!recents || !Array.isArray(recents)) {
                res.status(400).send("Params not valid"); 
                return;
            }
            
            for(let i = 0; i < recents.length; i++){
                if(!recents[i].lat && !recents[i].lon && !recents[i].text) {
                    res.status(400).send("Searches not valid"); 
                    return;
                }
            }
            
            const data = await this.immobileService?.getFromRecentSearches(recents);
            res.json(data);
        } catch (error) {
            res.status(400).send("Wrong JSON format");
        }
    }
}