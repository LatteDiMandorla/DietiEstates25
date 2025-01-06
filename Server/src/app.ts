import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ImmobileRoute } from "./routes/immobile";
import { MapRoute } from "./routes/map";
import Database from "./sequelize/database";

class App {
  private readonly app: Express;
  private readonly port: number;
  private readonly db: Database;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "3000");
    this.db = Database.getInstance();

    this.init();
  }

  private init() {
    this.initConfig();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.initDatabase();
  }

  private async initDatabase() {
    try {
      await this.db.connect();
      await this.db.sync();
    } catch (error) {
      console.log("Error Initializing DB", error);
    }
  }

  private initConfig() {
    
  }

  private initMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    dotenv.config();
  }

  private initRoutes() {
    const immobileRoute = new ImmobileRoute();
    this.app.use("/immobile", immobileRoute.router);
    const mapRoute = new MapRoute();
    this.app.use("/map", mapRoute.router);
  }

  private initErrorHandling() {

  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

export default App;