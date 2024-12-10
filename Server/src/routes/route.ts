import { Router } from "express";

export abstract class Route {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    protected abstract initRoutes() : void;
}