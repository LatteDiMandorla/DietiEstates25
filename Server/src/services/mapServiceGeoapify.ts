import axios from "axios";
import { Suggestion } from "../models/SuggestionT";
import { MapService } from "./interfaces/mapService";

export class MapServiceGeoapify implements MapService {
    private readonly apiKey: string;
    private readonly baseUrl: string;
  
    constructor() {
      this.apiKey = process.env.GEOAPIFY_API_KEY ?? '';
      this.baseUrl = 'https://api.geoapify.com';
    }
  
    public async getAutocompleteSuggestions(text: string, lang: string): Promise<Suggestion[]> {
      const url = `${this.baseUrl}/v1/geocode/autocomplete`;
      const params = {
        text: text,
        apiKey: this.apiKey,
        format: "json",
        lang: lang.slice(0, 2),
      };

      try {
        const response = await axios.get(url, { params });
        return response.data.results.map((element: any) => ({text: element.formatted, lon: element.lon, lat: element.lat}));
      } catch (error: any) {
        console.error('Geoapify API error:', error.message);
        throw new Error('Failed to fetch data from Geoapify.');
      }
    }

    public async getNearbyPlaces(lat: number, lon: number, lang: string): Promise<{ text: string; lat: number; lon: number; }[]> {
        const url = `${this.baseUrl}/v2/places`;
        const params = {
          apiKey: this.apiKey,
          filter: `circle:${lon},${lat},1500`,
          categories: "airport,commercial,catering,education,railway",
          limit: 30,
        }

        const res = await axios.get(url, { params });
        console.log(res.request)
        console.log(res.data);
        return res.data;
    }
}