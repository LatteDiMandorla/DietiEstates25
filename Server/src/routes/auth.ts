import { Request, Response, Router } from "express";
import { Route } from "./route";
import { AuthController } from "../controllers/authController";
import ValidationMiddlewares from "../middlewares/validationMiddlewares";
import { registerSchema } from "../schemas/authSchemas";
import StorageMiddlewares from "../middlewares/storageMiddlewares";

export class AuthRoute extends Route {
    private authController: AuthController;
    private validationMiddlewares: ValidationMiddlewares;
    private storageMiddlewates: StorageMiddlewares;

    constructor() {
        super();
        this.authController = new AuthController();
        this.validationMiddlewares = new ValidationMiddlewares();
        this.storageMiddlewates = new StorageMiddlewares();
        this.initRoutes();
    }

    protected override initRoutes() : void {
        this.router.post('/login', (req, res) => this.authController.login(req, res));
        this.router.post('/register', this.storageMiddlewates.single(), this.validationMiddlewares.validate(registerSchema), (req: Parameters<AuthController['register']>[0], res) => this.authController.register(req, res));
        this.router.get('/refresh', (req, res) => this.authController.refresh(req, res));
        this.router.get('/verify', (req, res) => this.authController.verify(req, res));
        this.router.post('/google', (req, res, next) => this.authController.googleAuth(req, res, next));
    }
}