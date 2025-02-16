import { MeteoController } from "../controllers/meteoController";
import { Route } from "./route";

export class MeteoRoute extends Route {
    private readonly meteoController: MeteoController;

    constructor(meteoController: MeteoController) {
        super();
        this.meteoController = meteoController;
        this.initRoutes();
    }

    protected override initRoutes() : void {
        this.router.post("/", (req, res) => this.meteoController.getFromDates(req, res));
    }
}