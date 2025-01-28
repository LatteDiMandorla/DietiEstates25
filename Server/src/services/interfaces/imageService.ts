export interface ImageService {
    upload(imagePath: string) : Promise<string>;
    uploadMultiple(imagesPaths: string[]) : Promise<string[]>;
}