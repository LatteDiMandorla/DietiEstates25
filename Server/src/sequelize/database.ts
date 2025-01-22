import { Sequelize } from 'sequelize';
import Immobile from './models/Immobile';
import { Immobili } from '../controllers/immobili';
import Utente from './models/Utente';
import Ricerca from './models/Ricerca';

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
    Immobile.initialize(this.sequelize);
    Utente.initialize(this.sequelize);
    Ricerca.initialize(this.sequelize);
  }

  private initializeAssociations(): void {
    // Inizializza tutti i modelli qui
    Ricerca.associate();
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
      await this.sequelize.sync(); // Sincronizza i modelli
      console.log('Database synced successfully.');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  }
}