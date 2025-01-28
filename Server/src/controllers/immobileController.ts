import { Request, Response } from "express";
import { ImmobileService } from "../services/immobileService";
import { ImageService } from "../services/interfaces/imageService";
import { ServiceFactory } from "../services/factory/serviceFactory";
import fs from 'fs';
import path from 'path';


export class ImmobileController {
    private immobileService : ImmobileService | undefined;
    private imageService : ImageService | undefined;

    constructor() {
        this.immobileService = new ImmobileService();
        const serviceFactor = new ServiceFactory();
        this.imageService = serviceFactor.getImageService(process.env.IMAGE_API || "Cloudinary");
    }

    public async getById(req : Request, res : Response) : Promise<void> {
        try {
            const id : number = parseInt(req.params.id);
            if(!id) {
                res.status(400).send("Id not valid"); 
                return;
            }
    
            const data = await this.immobileService?.getById(id);
            res.json(data);
        } catch (error) {
            res.sendStatus(400);
        }
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

    public async create(req: Request, res: Response) : Promise<void> {
        if (!req.files || !Array.isArray(req.files) || req.files.length > 20 || req.files.length <= 0) {
            res.status(400).json({ message: 'No files uploaded' });
            return;
        }

        try {
            const files = req.files;
            
            const imageUrl = await this.imageService?.uploadMultiple(files.map((f) => f.path));

            files.forEach(async (f) => {
                const fileAbsPath = path.join(__dirname, f.path);
                await fs.promises.unlink(fileAbsPath);
            })
            res.json({ url: imageUrl });
        } catch (error) {
            res.status(500).json({ message: 'Error uploading image', error });
        }
    }
}