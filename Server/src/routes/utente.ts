import { Router } from "express";
import { Route } from "./route";
import { UtenteController } from "../controllers/utenteController";

export class UtenteRoute extends Route {
    private utenteController: UtenteController;

    constructor() {
        super();
        this.utenteController = new UtenteController();
    }

    protected override initRoutes() : void {
        this.router.get("/recentSearches", (req, res) => this.utenteController.getRecentSearches(req, res));
        this.router.post("/recentSearches", (req, res) => this.utenteController.insertRecentSearch(req, res));
        this.router.get("/:id", (req, res) => this.utenteController.getById(req, res));
    }
}