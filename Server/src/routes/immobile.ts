import { Request, Router } from "express";
import { ImmobileController } from "../controllers/immobileController";
import { Route } from "./route";
import multer from 'multer';
import ValidationMiddlewares from "../middlewares/validationMiddlewares";
import { boundsSearchSchema } from "../schemas/immobileSchemas";
import { paginationSchema } from "../schemas/paginationSchemas";

export class ImmobileRoute extends Route {
    private immobileController: ImmobileController;
    private uploader: multer.Multer;
    private validationMiddlewares: ValidationMiddlewares;

    constructor() {
        super();
        this.immobileController = new ImmobileController();
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
              cb(null, 'uploads/');
            },
            filename: (req, file, cb) => {
              cb(null, `${Date.now()}-${file.originalname}`);
            },
        });
        this.uploader = multer({ storage });
        this.validationMiddlewares = new ValidationMiddlewares();
        this.initRoutes();
    }

    protected override initRoutes() : void {
        this.router.get("/bounds", this.validationMiddlewares.validate(boundsSearchSchema), this.validationMiddlewares.validate(paginationSchema),  (req: Parameters<ImmobileController['getByRange']>[0], res) => this.immobileController.getByRange(req, res));
        this.router.post("/searches", (req, res) => this.immobileController.getFromRecentSearches(req, res));
        this.router.get("/:id", (req, res) => this.immobileController.getById(req, res));
        this.router.post("/", (req, res, next) => this.uploader.array('files', 20)(req, res, next), (req, res) => this.immobileController.create(req, res));
    }
}