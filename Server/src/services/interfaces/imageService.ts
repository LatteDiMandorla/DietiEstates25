export interface ImageService {
    upload(imagePath: string) : Promise<string>;
    delete(url: string): Promise<void>;
    uploadFromUrl(url: string) : Promise<string>;
    uploadMultiple(imagesPaths: string[]) : Promise<string[]>;
}