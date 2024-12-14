import { Request, Response } from "express";
import { MapService } from "../services/mapService";

export class MapController {
    private mapService : MapService | undefined;

    constructor() {
        this.mapService = new MapService();
    }

    public async getAutocomplete(req: Request, res: Response): Promise<void> {
        const {text} = req.query;
    
        if (!text || typeof text !== 'string') {
          res.status(400).json({ error: 'The "text" query parameter is required and must be a string.' });
          return;
        }
    
        try {
          const suggestions = await this.mapService?.autocomplete(text);
          res.json(suggestions);
        } catch (error) {
          console.error('Autocomplete error:', error);
          res.status(500).json({ error: 'Failed to fetch autocomplete suggestions.' });
        }
      }
}