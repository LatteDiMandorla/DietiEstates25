import { Sequelize } from 'sequelize';
import Immobile from './models/Immobile';
import Utente from './models/Utente';
import Ricerca from './models/Ricerca';
import Prenotazione from './models/Prenotazione';
import Agente from './models/Agente';
import Agenzia from './models/Agenzia';
import Amministrazione from './models/Amministrazione';
import Auth from './models/Auth';

export default class Database {
  private static instance: Database;
  public sequelize: Sequelize;

  private constructor() {
    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite',
      logging: false,
      define: {
        freezeTableName: true,
      },
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
    Amministrazione.initialize(this.sequelize);
    Immobile.initialize(this.sequelize);
    Ricerca.initialize(this.sequelize);
    Prenotazione.initialize(this.sequelize);
    Agenzia.initialize(this.sequelize);
    Auth.initialize(this.sequelize);
  }

  private initializeAssociations(): void {
    // Inizializza tutti i modelli qui
    Immobile.associate();
    Ricerca.associate();
    Prenotazione.associate();
    Amministrazione.associate();
    Agente.associate();
    Utente.associate();
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