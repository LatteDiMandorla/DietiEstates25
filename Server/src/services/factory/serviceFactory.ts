import { ImageServiceCloudinary } from "../imageServiceCloudinary";
import { ImageService } from "../interfaces/imageService";
import { MapService } from "../interfaces/mapService";
import { MeteoService } from "../interfaces/meteoService";
import { MapServiceGeoapify } from "../mapServiceGeoapify";
import { MeteoServiceOpenMeteo } from "../meteoServiceOpenMeteo";
import { MailServiceMailtrap } from "../mailServiceMailtrap";
import { MailService } from "../interfaces/mailService";
import { MailServiceGmail } from "../mailServiceGmail";

export class ServiceFactory {
    public getMapService(type: string) : MapService {
        if(type == "Geoapify"){
            return new MapServiceGeoapify();
        }

        throw new Error(`Service of type ${type} not found`);
    }

    public getMeteoService(type: string) : MeteoService {
        if(type == "OpenMeteo"){
            return new MeteoServiceOpenMeteo();
        }

        throw new Error(`Service of type ${type} not found`);

    }

    public getImageService(type: string) : ImageService {
        if(type == "Cloudinary"){
            return new ImageServiceCloudinary();
        }

        throw new Error(`Service of type ${type} not found`);
    }

    public getMailService(type: string) : MailService {
        if(type == "Mailtrap"){
            return new MailServiceMailtrap();
        } else if (type == "Gmail") {
            return new MailServiceGmail();
        }

        throw new Error(`Service of type ${type} not found`);
    }
}