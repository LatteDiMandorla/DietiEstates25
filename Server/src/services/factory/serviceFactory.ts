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

    public getMailService(type: string) : MailService | undefined {
        if(type == "Mailtrap"){
            return new MailServiceMailtrap();
        } else if (type == "Gmail") {
            return new MailServiceGmail();
        }
    }
}