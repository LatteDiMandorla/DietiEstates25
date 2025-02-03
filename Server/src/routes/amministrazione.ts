import { Route } from "./route";
import AuthMiddleware from "../middlewares/authMiddlewares";
import { AmministrazioneController } from "../controllers/amministrazioneController";

export class AmministrazioneRoute extends Route {
    private amministrazioneController: AmministrazioneController;
    private authMiddleware: AuthMiddleware;

    constructor() {
        super();
        this.amministrazioneController = new AmministrazioneController();
        this.authMiddleware = new AuthMiddleware();
        this.initRoutes();
    }

    protected override initRoutes() : void {
        this.router.get("/", this.authMiddleware.verifyTokenWithRole(["GESTORE", "SUPPORTO"]), (req, res) => this.amministrazioneController.getAllAdmin(req, res));
    }
}