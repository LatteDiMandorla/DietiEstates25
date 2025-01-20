import { Request, Response, Router } from "express";
import { Route } from "./route";
import { AuthController } from "../controllers/authController";

export class AuthRoute extends Route {
    private authController: AuthController;

    constructor() {
        super();
        this.authController = new AuthController();
    }

    protected override initRoutes() : void {
        this.router.post('/login', (req, res) => this.authController.login(req, res));
        this.router.post('/register', (req, res) => this.authController.register(req, res));
        this.router.get('/refresh', (req, res) => this.authController.refresh(req, res));
        this.router.post('/google', (req, res, next) => this.authController.googleAuth(req, res, next));
    }
}