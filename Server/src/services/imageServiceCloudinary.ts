import { ImageService } from "./interfaces/imageService";
import { v2 as cloudinary } from 'cloudinary';

export class ImageServiceCloudinary implements ImageService {
    private readonly baseUrl: string;
    private readonly API_KEY;
    private readonly API_SECRET;
    private readonly CLOUD_NAME;

    constructor() {
        this.API_KEY = process.env.CLOUDINARY_API_KEY;
        this.API_SECRET = process.env.CLOUDINARY_SECRET;
        this.CLOUD_NAME = process.env.CLOUDINARY_NAME;
        this.baseUrl = 'https://api.imgur.com/3/image';
        cloudinary.config({
            cloud_name: this.CLOUD_NAME,
            api_key: this.API_KEY,
            api_secret: this.API_SECRET,
        });
    }

    public async upload(imagePath: any): Promise<string> {
        try {
            const result = await cloudinary.uploader.upload(imagePath);

            return result.secure_url;
        } catch (error) {
            console.error('Errore durante il caricamento su Imgur:', error);
            throw new Error('Impossibile caricare l\'immagine');
        }
    }

    public async uploadMultiple(imagesPaths: string[]): Promise<string[]> {
        const urls: string[] = [];
        for(const path of imagesPaths){
            try {
                const url = await this.upload(path);
                urls.unshift(url);
            } catch (error) {
                Promise.reject(new Error());
            }
        }
        return urls;
    }

    public async uploadFromUrl(url: string): Promise<string> {
        try {
            const result = await cloudinary.uploader.upload(url);

            return result.secure_url;
        } catch (error) {
            console.error('Errore durante il caricamento su Imgur:', error);
            throw new Error('Impossibile caricare l\'immagine');
        }
    }

    public async delete(url: string): Promise<void> {
        const matches = /\/upload\/(?:v\d+\/)?(.+)\.\w+$/.exec(url);
        if(!matches?.[1]){
            return Promise.reject(new Error("Cannot get public id from url"));
        }

        await cloudinary.uploader.destroy(matches[1]);
    }
}