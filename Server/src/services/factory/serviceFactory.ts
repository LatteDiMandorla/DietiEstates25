import { ImageServiceCloudinary } from "../imageServiceCloudinary";
import { ImageService } from "../interfaces/imageService";
import { MapService } from "../interfaces/mapService";
import { MeteoService } from "../interfaces/meteoService";
import { MapServiceGeoapify } from "../mapServiceGeoapify";
import { MeteoServiceOpenMeteo } from "../meteoServiceOpenMeteo";

export class ServiceFactory {
    public getMapService(type: string) : MapService| undefined {
        if(type == "Geoapify"){
            return new MapServiceGeoapify();
        }
    }

    public getMeteoService(type: string) : MeteoService | undefined {
        if(type == "OpenMeteo"){
            return new MeteoServiceOpenMeteo();
        }
    }

    public getImageService(type: string) : ImageService | undefined {
        if(type == "Cloudinary"){
            return new ImageServiceCloudinary();
        }
    }
}