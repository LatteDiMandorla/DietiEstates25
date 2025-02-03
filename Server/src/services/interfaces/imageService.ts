export interface ImageService {
    upload(imagePath: string) : Promise<string>;
    uploadFromUrl(url: string) : Promise<string>;
    uploadMultiple(imagesPaths: string[]) : Promise<string[]>;
}