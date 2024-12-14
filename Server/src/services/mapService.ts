import axios from "axios";
import { Suggestion } from "../intefaces/SuggestionT";

export class MapService {
    private readonly apiKey: string;
    private readonly baseUrl: string;
  
    constructor() {
      this.apiKey = process.env.GEOAPIFY_API_KEY || '';
      this.baseUrl = 'https://api.geoapify.com/v1/geocode';
    }
  
    public async autocomplete(text: string): Promise<Suggestion[]> {
      const url = `${this.baseUrl}/autocomplete`;
      const params = {
        text: text,
        apiKey: this.apiKey,
        format: "json",
      };

      try {
        const response = await axios.get(url, { params });
        return response.data.results.map((element: any) => ({text: element.formatted, lon: element.lon, lat: element.lat}));
      } catch (error: any) {
        console.error('Geoapify API error:', error.message);
        throw new Error('Failed to fetch data from Geoapify.');
      }
    }
}