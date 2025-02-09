import { Route } from "./route";
import AuthMiddleware from "../middlewares/authMiddlewares";
import { PrenotazioneController } from "../controllers/prenotazioneController";

export class PrenotazioneRoute extends Route {
    private prenotazioneController: PrenotazioneController;
    private authMiddleware: AuthMiddleware;

    constructor(prenotazioneController: PrenotazioneController) {
        super();
        this.prenotazioneController = prenotazioneController;
        this.authMiddleware = new AuthMiddleware();
        this.initRoutes();
    }

    protected override initRoutes() : void {
        this.router.post("/request", this.authMiddleware.verifyTokenWithRole("CLIENTE"), (req, res) => this.prenotazioneController.insertUtentePrenotazione(req, res));
        this.router.post("/", this.authMiddleware.verifyTokenWithRole("AGENTE"), (req, res) => this.prenotazioneController.insertPrenotazione(req, res));
        this.router.get("/:id", (req, res) => this.prenotazioneController.getById(req, res));
    }
}