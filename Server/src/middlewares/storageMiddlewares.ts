// src/middleware/AuthMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

class StorageMiddlewares {
    private uploader: multer.Multer;

    constructor(path: string = "uploads/") {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
              cb(null, path);
            },
            filename: (req, file, cb) => {
              cb(null, `${Date.now()}-${file.originalname}`);
            },
        });

        this.uploader = multer({ storage });
    }

    public single() {
        return this.uploader.single('file');
    }

    public multiple(max: number) {
        return this.uploader.array('files', 20);
    }
}

export default StorageMiddlewares;
