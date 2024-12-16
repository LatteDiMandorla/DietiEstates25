import { Suggestion } from "../../models/SuggestionT";

export interface MapService {
    getAutocompleteSuggestions(query: string) : Promise<Suggestion[]>;
}