import { Sequelize } from 'sequelize';
import Immobile from './models/Immobile';
import Utente from './models/Utente';
import Ricerca from './models/Ricerca';
import Prenotazione from './models/Prenotazione';
import Agente from './models/Agente';
import Agenzia from './models/Agenzia';
import Amministrazione from './models/Amministrazione';

export default class Database {
  private static instance: Database;
  public sequelize: Sequelize;

  private constructor() {
    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite',
      logging: false,
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private initializeModels(): void {
    // Inizializza tutti i modelli qui
    Utente.initialize(this.sequelize);
    Agente.initialize(this.sequelize);
    Immobile.initialize(this.sequelize);
    Ricerca.initialize(this.sequelize);
    Prenotazione.initialize(this.sequelize);
    Agenzia.initialize(this.sequelize);
    Amministrazione.initialize(this.sequelize);
  }

  private initializeAssociations(): void {
    // Inizializza tutti i modelli qui
    Immobile.associate();
    Ricerca.associate();
    Prenotazione.associate();
    Amministrazione.associate();
  }

  public async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log('Database connected successfully.');
      this.initializeModels(); // Inizializza i modelli dopo la connessione
      this.initializeAssociations(); // Inizializza i modelli dopo la connessione
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  public async sync(): Promise<void> {
    try {
      // const date = [
      //   "2025-02-01 ",
      //   "2025-02-02 ",
      //   "2025-02-03 ",
      //   "2025-02-04 ",
      //   "2025-02-05 ",
      //   "2025-02-06 ",
      //   "2025-02-07 ",
      //   "2025-02-08 ",
      //   "2025-02-09 ",
      //   "2025-02-10 ",
      // ]
      // const orari = [
      //   "10:30:00",
      //   "11:30:00",
      //   "12:00:00",
      //   "12:30:00",
      //   "14:00:00",
      //   "14:30:00",
      //   "15:30:00",
      //   "16:00:00",
      //   "16:30:00",
      //   "17:00:00",
      //   "18:00:00",
      // ]
      // await Prenotazione.truncate();
      // for(let i = 1; i <= 25; i++){
      //   for(const data of date) {
      //     for(const orario of orari){
      //       console.log(data+orario);
      //       await Prenotazione.create({data: data+orario, ImmobileId: i, AgenteId: 1});
      //     }
      //   }
      // }
      
      //await Agenzia.create({nome: "Case&Case", email: "business@caseecase.com", password: "cjK2lrz4", image: "https://picsum.photos/seed/CaseeCase/300"});
      await this.sequelize.sync(); // Sincronizza i modelli

      console.log('Database synced successfully.');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  }
}