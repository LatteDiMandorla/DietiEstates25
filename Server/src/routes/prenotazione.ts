import { Route } from "./route";
import AuthMiddleware from "../middlewares/authMiddlewares";
import { PrenotazioneController } from "../controllers/prenotazioneController";

export class PrenotazioneRoute extends Route {
    private readonly prenotazioneController: PrenotazioneController;
    private readonly authMiddleware: AuthMiddleware;

    constructor(prenotazioneController: PrenotazioneController) {
        super();
        this.prenotazioneController = prenotazioneController;
        this.authMiddleware = new AuthMiddleware();
        this.initRoutes();
    }

    protected override initRoutes() : void {
        this.router.post("/request", this.authMiddleware.verifyTokenWithRole("CLIENTE"), (req, res) => this.prenotazioneController.insertUtentePrenotazione(req, res));
        this.router.post("/accept", this.authMiddleware.verifyTokenWithRole("AGENTE"), (req, res) => this.prenotazioneController.acceptAgentePrenotazione(req, res));
        this.router.post("/", this.authMiddleware.verifyTokenWithRole("AGENTE"), (req, res) => this.prenotazioneController.insertPrenotazione(req, res));
        this.router.get("/", this.authMiddleware.verifyTokenWithRole(["AGENTE", "CLIENTE"]), (req, res) => this.prenotazioneController.getByUser(req, res));
        this.router.get("/:id", (req, res) => this.prenotazioneController.getById(req, res));
    }
}