import { Request, Response } from "express";
import { Route } from "./route";
import { AuthController } from "../controllers/authController";
import ValidationMiddlewares from "../middlewares/validationMiddlewares";
import StorageMiddlewares from "../middlewares/storageMiddlewares";
import AuthMiddleware from "../middlewares/authMiddlewares";
import { registerAgenteSchema, registerClienteSchema, registerGestoreSchema, registerSupportoSchema } from "../schemas/authSchemas";

export class AuthRoute extends Route {
    private readonly authController: AuthController;
    private readonly validationMiddlewares: ValidationMiddlewares;
    private readonly storageMiddlewates: StorageMiddlewares;
    private readonly authMiddlewares: AuthMiddleware;

    constructor(authController: AuthController) {
        super();
        this.authController = authController;
        
        this.validationMiddlewares = new ValidationMiddlewares();
        this.storageMiddlewates = new StorageMiddlewares();
        this.authMiddlewares = new AuthMiddleware();
        this.initRoutes();
    }

    protected override initRoutes() : void {
        this.router.post('/login', (req, res) => this.authController.login(req, res));
        this.router.post('/google', (req, res, next) => this.authController.googleAuth(req, res, next));

        this.router.post('/register/cliente', this.storageMiddlewates.single(), this.validationMiddlewares.validate(registerClienteSchema), (req: Parameters<AuthController['registerCliente']>[0], res) => this.authController.registerCliente(req, res));
        this.router.post('/register/gestore', this.validationMiddlewares.validate(registerGestoreSchema), (req: Parameters<AuthController["registerGestore"]>[0], res) => this.authController.registerGestore(req, res));
        this.router.post('/register/supporto', this.validationMiddlewares.validate(registerSupportoSchema), this.authMiddlewares.verifyTokenWithRole(["GESTORE", "SUPPORTO"]), (req: Parameters<AuthController["registerSupporto"]>[0], res) => this.authController.registerSupporto(req, res));
        this.router.post('/register/agente', this.validationMiddlewares.validate(registerAgenteSchema), this.authMiddlewares.verifyTokenWithRole(["GESTORE","SUPPORTO"]), (req: Parameters<AuthController["registerAgente"]>[0], res) => this.authController.registerAgente(req, res));

        this.router.get('/self', this.authMiddlewares.verifyToken, (req: Request, res: Response) => this.authController.getInfo(req, res));

        this.router.get('/refresh', (req, res) => this.authController.refresh(req, res));
        this.router.get('/verify', (req, res) => this.authController.verify(req, res));
        this.router.get('/logout', (req, res) => this.authController.logout(req, res));
        this.router.post('/requestResetPassword', (req, res) => this.authController.requestResetPassword(req, res));
        this.router.post('/resetPassword', (req, res) => this.authController.resetPassword(req, res));
    }
}