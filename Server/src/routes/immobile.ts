import { Request, Router } from "express";
import { ImmobileController } from "../controllers/immobileController";
import { Route } from "./route";
import multer from 'multer';
import ValidationMiddlewares from "../middlewares/validationMiddlewares";
import { boundsSearchSchema } from "../schemas/immobileSchemas";
import { paginationSchema } from "../schemas/paginationSchemas";
import StorageMiddlewares from "../middlewares/storageMiddlewares";

export class ImmobileRoute extends Route {
    private immobileController: ImmobileController;
    private storageMiddlewares: StorageMiddlewares;
    private validationMiddlewares: ValidationMiddlewares;

    constructor(immobileController: ImmobileController) {
        super();
        this.immobileController = immobileController;
        this.storageMiddlewares = new StorageMiddlewares();
        this.validationMiddlewares = new ValidationMiddlewares();
        this.initRoutes();
    }

    protected override initRoutes() : void {
        this.router.get("/bounds", this.validationMiddlewares.validate(boundsSearchSchema), this.validationMiddlewares.validate(paginationSchema),  (req: Parameters<ImmobileController['getByRange']>[0], res) => this.immobileController.getByRange(req, res));
        this.router.post("/searches", (req, res) => this.immobileController.getFromRecentSearches(req, res));
        this.router.get("/:id", (req, res) => this.immobileController.getById(req, res));
        this.router.post("/", this.storageMiddlewares.multiple(20), (req, res) => this.immobileController.create(req, res));
    }
}