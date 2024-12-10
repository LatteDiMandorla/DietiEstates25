import { Router } from "express";
import { ImmobileController } from "../controllers/immobile";
import { Route } from "./route";

export class ImmobileRoute extends Route {
    private immobileController: ImmobileController;

    constructor() {
        super();
        this.immobileController = new ImmobileController();
    }

    protected override initRoutes() : void {
        this.router.get("/:id", (req, res) => this.immobileController.getById(req, res));
    }
}