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
import { PrenotazioneRoute } from "./routes/prenotazione";
import { AmministrazioneRoute } from "./routes/amministrazione";
import { ImmobileService } from "./services/immobileService";
import { AuthServiceLocal } from "./services/authServiceLocal";
import { DAOFactory } from "./daos/factory/DAOFactory";
import { ImmobileController } from "./controllers/immobileController";
import { AuthController } from "./controllers/authController";
import { AgenteService } from "./services/agenteService";
import { AgenziaService } from "./services/agenziaService";
import { AmministrazioneService } from "./services/amministrazioneService";
import { PrenotazioneService } from "./services/prenotazioneService";
import { UtenteService } from "./services/utenteService";
import { ServiceFactory } from "./services/factory/serviceFactory";
import { MapController } from "./controllers/mapController";
import { UtenteController } from "./controllers/utenteController";
import { AuthServiceGoogle } from "./services/authServiceGoogle";
import { MeteoController } from "./controllers/meteoController";
import { PrenotazioneController } from "./controllers/prenotazioneController";
import { AmministrazioneController } from "./controllers/amministrazioneController";

class App {
  private readonly app: Express;
  private readonly port: number;
  private readonly db: Database;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT ?? "3000");
    this.db = Database.getInstance();

    this.init();
  }

  private init() {
    this.initMiddlewares();
    this.initDAOs();
    this.initRoutes();
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


  private initMiddlewares() {
    this.app.use(cors({origin: ['http://localhost:5173', process.env.CLIENT_URL ?? ""], methods: ['GET', 'POST'], credentials: true}));
    this.app.use(express.json());
    dotenv.config();
    this.app.use(cookieParser());
  }

  private initRoutes() {
    const {immobileService, authServiceLocal, authServiceGoogle, agenteService, agenziaService, amministrazioneService, prenotazioneService, utenteService, mapService, imageService, mailService, meteoService} = this.initServices();
    const immobileRoute = new ImmobileRoute(new ImmobileController(immobileService, imageService));
    this.app.use("/immobile", immobileRoute.router);
    const mapRoute = new MapRoute(new MapController(mapService));
    this.app.use("/map", mapRoute.router);
    const utenteRoute = new UtenteRoute(new UtenteController(utenteService, agenteService, imageService));
    this.app.use("/utente", utenteRoute.router);
    const authRoute = new AuthRoute(new AuthController(authServiceLocal, authServiceGoogle, mailService, utenteService, agenteService, amministrazioneService, agenziaService, imageService));
    this.app.use("/auth", authRoute.router);
    const meteoRoute = new MeteoRoute(new MeteoController(meteoService));
    this.app.use("/meteo", meteoRoute.router);
    const prenotazioneRoute = new PrenotazioneRoute(new PrenotazioneController(prenotazioneService, utenteService, agenteService));
    this.app.use("/prenotazione", prenotazioneRoute.router);
    const amministrazioneRoute = new AmministrazioneRoute(new AmministrazioneController(amministrazioneService, agenziaService));
    this.app.use("/amministrazione", amministrazioneRoute.router);
  }

  private initDAOs(){
    const factory = new DAOFactory();
    const daoType = process.env.DAO_TYPE!;
    
    const immobileDAO = factory.getImmobileDAO(daoType);
    const authDAO = factory.getAuthDAO(daoType);
    const agenteDAO = factory.getAgenteDAO(daoType);
    const agenziaDAO = factory.getAgenziaDAO(daoType);
    const amministratoreDAO = factory.getAmministrazioneDAO(daoType);
    const prenotazioneDAO = factory.getPrenotazioneDAO(daoType);
    const ricercaDAO = factory.getRicercaDAO(daoType);
    const utenteDAO = factory.getUtenteDAO(daoType);

    return {immobileDAO, authDAO, agenteDAO, agenziaDAO, amministratoreDAO, prenotazioneDAO, ricercaDAO, utenteDAO};
  }

  private initServices(){
    const {immobileDAO, authDAO, agenteDAO, agenziaDAO, amministratoreDAO, prenotazioneDAO, ricercaDAO, utenteDAO} = this.initDAOs();
    
    const immobileService = new ImmobileService(immobileDAO, prenotazioneDAO);
    const authServiceLocal = new AuthServiceLocal(authDAO);
    const authServiceGoogle = new AuthServiceGoogle();
    const agenteService = new AgenteService(agenteDAO);
    const agenziaService = new AgenziaService(agenziaDAO);
    const amministrazioneService = new AmministrazioneService(amministratoreDAO, agenziaDAO);
    const prenotazioneService = new PrenotazioneService(prenotazioneDAO, immobileDAO);
    const utenteService = new UtenteService(utenteDAO, ricercaDAO);

    const factory = new ServiceFactory();
    const mapServiceType = process.env.MAP_API!;
    const imageServiceType = process.env.IMAGE_API!;
    const mailServiceType = process.env.MAIL_API!;
    const meteoServiceType = process.env.METEO_API!;

    const mapService = factory.getMapService(mapServiceType);
    const imageService = factory.getImageService(imageServiceType);
    const mailService = factory.getMailService(mailServiceType);
    const meteoService = factory.getMeteoService(meteoServiceType);

    return {immobileService, authServiceLocal, authServiceGoogle, agenteService, agenziaService, amministrazioneService, prenotazioneService, utenteService, mapService, imageService, mailService, meteoService};
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running`);
    });
  }
}

export default App;