import { Weather } from "../../models/WeatherT";

export interface MeteoService {
    getPrevisionFromDates(dates: string[], lat: number, lon: number) : Promise<Weather[]>;
}