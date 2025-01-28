import axios from "axios";
import { Weather } from "../models/WeatherT";
import { MeteoService } from "./interfaces/meteoService";

export class MeteoServiceOpenMeteo implements MeteoService {
    private readonly baseUrl: string;
  
    constructor() {
      this.baseUrl = 'https://api.open-meteo.com/v1/forecast';
    }

    private mapWeatherCode(code: number): Weather["state"] | undefined {
        if (code === 0) return "sereno";
        if (code === 1) return "prevalentemente sereno";
        if (code === 2) return "parzialmente nuvoloso";
        if (code === 3) return "nuvoloso";
        if ([45, 48].includes(code)) return "nebbia";
        if ([51, 53, 55].includes(code)) return "pioggia debole";
        if ([61, 63, 65, 80, 81, 82].includes(code)) return "pioggia";
        if ([71, 73, 75, 85, 86].includes(code)) return "neve";
        if ([95, 96, 99].includes(code)) return "temporale";
        return undefined;
    };
    
    public async getPrevisionFromDates(dates: string[], lat: number, lon: number): Promise<Weather[]> {
        const params = {
            latitude: lat,
            longitude: lon,
            hourly: 'temperature_2m,weathercode',
        }

        const weathers : Weather[] = [];
        const {data} = await axios.get(this.baseUrl, { params });

        dates.map((date) => {
            const index = data.hourly.time.indexOf(date.slice(0, 14) + "00");
            weathers.unshift({
                temperature: parseFloat(data.hourly.temperature_2m[index] as string) || 0,
                state: this.mapWeatherCode(data.hourly.weathercode[index] as number),
            });
        });

        return weathers;
    }
}