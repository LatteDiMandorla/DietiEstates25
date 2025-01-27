import { MeteoController } from "../controllers/meteoController";
import { Route } from "./route";

export class MeteoRoute extends Route {
    private meteoController: MeteoController;

    constructor() {
        super();
        this.meteoController = new MeteoController();
    }

    protected override initRoutes() : void {
        this.router.post("/", (req, res) => this.meteoController.getFromDates(req, res));
    }
}