import { Router } from "express";
import { ImmobileController } from "../controllers/immobileController";
import { Route } from "./route";
import multer from 'multer';

export class ImmobileRoute extends Route {
    private immobileController: ImmobileController;
    private uploader: multer.Multer;

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
    }

    protected override initRoutes() : void {
        this.router.get("/bounds", (req, res) => this.immobileController.getByRange(req, res));
        this.router.post("/searches", (req, res) => this.immobileController.getFromRecentSearches(req, res));
        this.router.get("/:id", (req, res) => this.immobileController.getById(req, res));
        this.router.post("/", (req, res, next) => this.uploader.array('files', 20)(req, res, next), (req, res) => this.immobileController.create(req, res));
    }
}