import { Router } from "express";
import { ImmobileController } from "../controllers/immobileController";
import { Route } from "./route";

export class ImmobileRoute extends Route {
    private immobileController: ImmobileController;

    constructor() {
        super();
        this.immobileController = new ImmobileController();
    }

    protected override initRoutes() : void {
        this.router.get("/bounds", (req, res) => this.immobileController.getByRange(req, res));
        this.router.get("/searches", (req, res) => this.immobileController.getFromRecentSearches(req, res));
        this.router.get("/:id", (req, res) => this.immobileController.getById(req, res));
    }
}