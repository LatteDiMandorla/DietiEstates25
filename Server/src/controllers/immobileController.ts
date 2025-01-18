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
        const {neLat, neLon, swLat, swLon} = req.query;
        if (!neLat || typeof neLat !== 'string' || !parseFloat(neLat) || !neLon || typeof neLon !== 'string' || !parseFloat(neLon) || !swLat || typeof swLat !== 'string' || !parseFloat(swLat) || !swLon || typeof swLon !== 'string' || !parseFloat(swLon)) {
            res.status(400).json({ error: 'The query parameters are required and must be numbers.' });
            return;
        }
        const data = await this.immobileService?.getInRange(parseFloat(neLat), parseFloat(neLon), parseFloat(swLat), parseFloat(swLon));
        res.json(data);
    }

    public async getFromRecentSearches(req: Request, res: Response) : Promise<void> {
        try {
            const recents = req.query.recents ? JSON.parse(decodeURIComponent(req.query.recents as string)) : [];
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