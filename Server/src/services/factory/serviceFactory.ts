import { MapService } from "../interfaces/mapService";
import { MapServiceGeoapify } from "../mapServiceGeoapify";

export class ServiceFactory {
    public getMapService(type: string) : MapService| undefined {
        if(type == "Geoapify"){
            return new MapServiceGeoapify();
        }
    }
}