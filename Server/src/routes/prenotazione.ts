import { Route } from "./route";
import AuthMiddleware from "../middlewares/authMiddlewares";
import { PrenotazioneController } from "../controllers/prenotazioneController";

export class PrenotazioneRoute extends Route {
    private prenotazioneController: PrenotazioneController;
    private authMiddleware: AuthMiddleware;

    constructor() {
        super();
        this.prenotazioneController = new PrenotazioneController();
        this.authMiddleware = new AuthMiddleware();
        this.initRoutes();
    }

    protected override initRoutes() : void {
        this.router.post("/request", (req, res, next) => this.authMiddleware.verifyToken(req, res, next), (req, res) => this.prenotazioneController.insertUtentePrenotazione(req, res));
        this.router.post("/", (req, res, next) => this.authMiddleware.verifyToken(req, res, next), (req, res) => this.prenotazioneController.insertPrenotazione(req, res));
        this.router.get("/:id", (req, res) => this.prenotazioneController.getById(req, res));
    }
}