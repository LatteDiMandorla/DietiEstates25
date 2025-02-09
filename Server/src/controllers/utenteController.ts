import { Request, Response } from "express";
import { UtenteService } from "../services/utenteService";
import { ImageService } from "../services/interfaces/imageService";

export class UtenteController {
    private utenteService : UtenteService | undefined;
    private imageService : ImageService;

    constructor(utenteService : UtenteService, imageService : ImageService) {
        this.utenteService = utenteService;
        this.imageService = imageService;
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

    public async updateInfo(req: Request, res: Response) {
        try {            
            const id = res.locals.id;
            const {nome, cognome} = req.body;
            await this.utenteService?.updateInfo(id, nome, cognome);
            res.sendStatus(200)
        } catch (error) {
            res.status(400).json(error);
        }
    }

    public async updateImage(req: Request, res: Response) {
        try {            
            const id = res.locals.id;
            const file = req.file;
            if(!file || !file.path){
                res.status(400).send("Missing file");
                return;
            }

            const url = await this.imageService.upload(file.path);
            const oldUrl = await this.utenteService?.updateImage(id, url);
            if(oldUrl) {
                await this.imageService.delete(oldUrl);
            }
            res.sendStatus(200)
        } catch (error) {
            res.status(400).json(error);
        }
    }
}