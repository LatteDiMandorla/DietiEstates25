import { Route } from "./route";
import { UtenteController } from "../controllers/utenteController";
import AuthMiddleware from "../middlewares/authMiddlewares";
import StorageMiddlewares from "../middlewares/storageMiddlewares";

export class UtenteRoute extends Route {
    private readonly utenteController: UtenteController;
    private readonly authMiddleware: AuthMiddleware;
    private readonly storageMiddlewares: StorageMiddlewares;

    constructor(utenteController: UtenteController) {
        super();
        this.utenteController = utenteController;
        this.authMiddleware = new AuthMiddleware();
        this.storageMiddlewares = new StorageMiddlewares();
        this.initRoutes();
    }

    protected override initRoutes() : void {
        this.router.get("/recentSearches", (req, res) => this.utenteController.getRecentSearches(req, res));
        this.router.post("/recentSearches", (req, res) => this.utenteController.insertRecentSearch(req, res));
        this.router.post("/info", this.authMiddleware.verifyTokenWithRole("CLIENTE"), (req, res) => this.utenteController.updateInfo(req, res));
        this.router.post("/image", this.authMiddleware.verifyTokenWithRole("CLIENTE"), this.storageMiddlewares.single(), (req: Parameters<UtenteController["updateImage"]>[0], res) => this.utenteController.updateImage(req, res));
        this.router.get("/:id", (req, res, next) => this.authMiddleware.verifyToken(req, res, next), (req, res) => this.utenteController.getById(req, res));
    }
}