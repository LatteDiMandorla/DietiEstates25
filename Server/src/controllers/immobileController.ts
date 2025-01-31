import { Request, Response } from "express";
import { ImmobileService } from "../services/immobileService";
import { ImageService } from "../services/interfaces/imageService";
import { ServiceFactory } from "../services/factory/serviceFactory";
import fs from 'fs';
import path from 'path';
import { BoundsSearchQueryInput } from "../schemas/immobileSchemas";
import { PaginationQueryInput } from "../schemas/paginationSchemas";


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