import { Request, Response } from "express";
import { MapService } from "../services/interfaces/mapService";
import { ServiceFactory } from "../services/factory/serviceFactory";

export class MapController {
    private mapService : MapService | undefined;

    constructor() {
        const serviceFactory = new ServiceFactory();
        this.mapService = serviceFactory.getMapService(process.env.MAP_API || "Geoapify");
    }

    public async getAutocomplete(req: Request, res: Response): Promise<void> {
        const {text} = req.query;
    
        if (!text || typeof text !== 'string') {
          res.status(400).json({ error: 'The "text" query parameter is required and must be a string.' });
          return;
        }
    
        try {
          const suggestions = await this.mapService?.getAutocompleteSuggestions(text);
          res.json(suggestions);
        } catch (error) {
          console.error('Autocomplete error:', error);
          res.status(500).json({ error: 'Failed to fetch autocomplete suggestions.' });
        }
      }
}