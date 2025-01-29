import { Router } from "express";

export abstract class Route {
    public router: Router;

    constructor() {
        this.router = Router();
    }

    protected abstract initRoutes() : void;
}