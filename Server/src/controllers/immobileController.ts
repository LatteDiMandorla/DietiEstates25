import { Request, Response } from "express";
import { ImmobileService } from "../services/immobileService";
import { ImageService } from "../services/interfaces/imageService";
import fs from 'fs';
import path from 'path';
import { BoundsSearchQueryInput } from "../schemas/immobileSchemas";
import { PaginationQueryInput } from "../schemas/paginationSchemas";


export class ImmobileController {
    private readonly immobileService : ImmobileService;
    private readonly imageService : ImageService;

    constructor(immobileService: ImmobileService, imageService: ImageService) {
        this.immobileService = immobileService;
        this.imageService = imageService;
    }

    public async getById(req : Request, res : Response) : Promise<void> {
        try {
            const id : number = parseInt(req.params.id);
            if(!id) {
                res.status(400).send("Id not valid"); 
                return;
            }
    
            const data = await this.immobileService?.getByIdWithTimes(id);
            res.json(data);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async getByRange(req: Request<{}, {}, {}, qs.ParsedQs & BoundsSearchQueryInput & PaginationQueryInput>, res: Response) : Promise<void> {
        const { neLat, neLon, swLat, swLon } = req.query;
        const {page, limit} = req.query;
        const {timestamp} = req.query;
        const data = await this.immobileService?.getInRange({latMax: neLat, latMin: swLat, lonMax: neLon, lonMin: swLon}, {page, limit, timestamp: timestamp});
        res.json({data, timestamp});
    }

    public async getFromRecentSearches(req: Request, res: Response) : Promise<void> {
        try {
            const {recents} = req.body;
            if(!recents || !Array.isArray(recents)) {
                res.status(400).send("Params not valid"); 
                return;
            }
            
            for(const r of recents){
                if(!r.lat && !r.lon && !r.text) {
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

    public async create(req: Request, res: Response) : Promise<void> {
        console.log(req.files);
        if (!req.files || !Array.isArray(req.files) || req.files.length > 20 || req.files.length <= 0) {
            res.status(400).json({ message: 'No files uploaded' });
            return;
        }
        const immobile = req.body;
        const id = res.locals.id;
        if(!immobile || !id){
            res.status(400).json({ message: 'Immobile non valido' });
            return;
        }

        try {
            const files = req.files;
            
            const imageUrl = await this.imageService?.uploadMultiple(files.map((f) => f.path));
            res.json({ url: imageUrl, immobile });
        } catch (error) {
            res.status(500).json({ message: 'Error uploading image', error });
        }
    }
}