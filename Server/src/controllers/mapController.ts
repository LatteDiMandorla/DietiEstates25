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
        const {text, lang} = req.query;
    
        if (!text || typeof text !== 'string' || !lang || typeof lang !== 'string') {
          res.status(400).json({ error: 'The "text" query parameter is required and must be a string.' });
          return;
        }
    
        try {
          const suggestions = await this.mapService?.getAutocompleteSuggestions(text, lang);
          res.json(suggestions);
        } catch (error) {
          console.error('Autocomplete error:', error);
          res.status(500).json({ error: 'Failed to fetch autocomplete suggestions.' });
        }
      }

    public async getNearbyPlaces(req: Request, res: Response) : Promise<void> {
      const {lat, lon, lang} = req.query;
      if (!lat || typeof lat !== 'string' || !parseFloat(lat) || !lon || typeof lon !== 'string' || !parseFloat(lon) || !lang || typeof lang !== 'string') {
        res.status(400).json({ error: 'The query parameters are required' });
        return;
      }
  
      try {
        const places = await this.mapService?.getNearbyPlaces(parseFloat(lat), parseFloat(lon), lang);
        res.json(places);
      } catch (error) {
        console.error('Nearby places error:', error);
        res.status(500).json({ error: 'Failed to fetch nearby places.' });
      }
    }
}