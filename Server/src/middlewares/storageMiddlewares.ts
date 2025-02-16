import multer from 'multer';
import fs from 'fs';
import path from 'path';  // Modulo Node.js

class StorageMiddlewares {
    private readonly uploader: multer.Multer;

    constructor(folderPath: string = "uploads/") {  // Cambiato 'path' in 'folderPath'
        // Crea il percorso assoluto della cartella
        const uploadPath = path.join(__dirname, folderPath);
        
        // Verifica se la cartella esiste, altrimenti la crea
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }); // Crea la cartella e le eventuali sottocartelle
        }

        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, uploadPath); // Utilizza la cartella definita
            },
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`); // Imposta il nome del file
            },
        });

        this.uploader = multer({ storage });
    }

    // Middleware per un singolo file
    public single() {
        return this.uploader.single('image');
    }

    // Middleware per più file
    public multiple(max: number) {
        return this.uploader.array('files', 20); // Supporta fino a 20 file
    }
}

export default StorageMiddlewares;

