import { Suggestion } from "../../models/SuggestionT";

export interface MapService {
    getAutocompleteSuggestions(query: string, lang: string, type?: string) : Promise<Suggestion[]>;
    getNearbyPlaces(lat: number, lon: number, lang: string) : Promise<{text: string, lat: number, lon: number}[]>
}