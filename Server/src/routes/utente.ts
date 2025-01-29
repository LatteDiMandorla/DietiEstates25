import { Router } from "express";
import { Route } from "./route";
import { UtenteController } from "../controllers/utenteController";
import AuthMiddleware from "../middlewares/authMiddlewares";

export class UtenteRoute extends Route {
    private utenteController: UtenteController;
    private authMiddleware: AuthMiddleware;

    constructor() {
        super();
        this.utenteController = new UtenteController();
        this.authMiddleware = new AuthMiddleware();
        this.initRoutes();
    }

    protected override initRoutes() : void {
        this.router.get("/recentSearches", (req, res) => this.utenteController.getRecentSearches(req, res));
        this.router.post("/recentSearches", (req, res) => this.utenteController.insertRecentSearch(req, res));
        this.router.get("/self", (req, res, next) => this.authMiddleware.verifyToken(req, res, next), (req, res) => this.utenteController.getSelf(req, res));
        this.router.get("/:id", (req, res, next) => this.authMiddleware.verifyToken(req, res, next), (req, res) => this.utenteController.getById(req, res));
    }
}