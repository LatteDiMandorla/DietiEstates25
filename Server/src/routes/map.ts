import { MapController } from "../controllers/mapController";
import ValidationMiddlewares from "../middlewares/validationMiddlewares";
import { Route } from "./route";

export class MapRoute extends Route {
    private mapController: MapController;

    constructor() {
        super();
        this.mapController = new MapController();
        this.initRoutes();
    }

    protected override initRoutes() : void {
        this.router.get("/autocomplete", (req, res) => this.mapController.getAutocomplete(req, res));
        this.router.get("/nearby", (req, res) => this.mapController.getNearbyPlaces(req, res));
    }
}