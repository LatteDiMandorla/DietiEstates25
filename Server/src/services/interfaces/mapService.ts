import { Suggestion } from "../../models/SuggestionT";

export interface MapService {
    getAutocompleteSuggestions(query: string, lang: string) : Promise<Suggestion[]>;
}