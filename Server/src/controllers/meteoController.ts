import { Request, Response } from "express";
import { ServiceFactory } from "../services/factory/serviceFactory";
import { MeteoService } from "../services/interfaces/meteoService";

export class MeteoController {
    private meteoService : MeteoService | undefined;

    constructor() {
        const serviceFactory = new ServiceFactory();
        this.meteoService = serviceFactory.getMeteoService(process.env.METEO_API || "OpenMeteo");
    }

    public async getFromDates(req: Request, res: Response) {
        try {
            const {dates, lat, lon} = req.body;
            if(!dates || !Array.isArray(dates) || !lat || typeof lat !== "number" || !lon || typeof lon !== "number") {
                res.status(400).send("Params not valid"); 
                return;
            }
            
            const data = await this.meteoService?.getPrevisionFromDates(dates, lat, lon);
            res.json(data);
        } catch (error) {
            res.sendStatus(400);
        }
    }
}