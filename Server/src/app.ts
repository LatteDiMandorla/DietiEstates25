import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import { ImmobileRoute } from "./routes/immobile";
import { MapRoute } from "./routes/map";
import Database from "./sequelize/database";
import { UtenteRoute } from "./routes/utente";
import { AuthRoute } from "./routes/auth";
import { MeteoRoute } from "./routes/meteo";

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
    this.app.use(cors({origin: 'http://localhost:5173', methods: ['GET', 'POST'], credentials: true}));
    this.app.use(express.json());
    dotenv.config();
    this.app.use(cookieParser());
  }

  private initRoutes() {
    const immobileRoute = new ImmobileRoute();
    this.app.use("/immobile", immobileRoute.router);
    const mapRoute = new MapRoute();
    this.app.use("/map", mapRoute.router);
    const utenteRoute = new UtenteRoute();
    this.app.use("/utente", utenteRoute.router);
    const authRoute = new AuthRoute();
    this.app.use("/auth", authRoute.router);
    const meteoRoute = new MeteoRoute();
    this.app.use("/meteo", meteoRoute.router);
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