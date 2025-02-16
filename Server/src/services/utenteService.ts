import { RicercaDAO } from "../daos/interfaces/RicercaDAO";
import { UtenteDAO } from "../daos/interfaces/UtenteDAO";
import { Ricerca } from "../models/RicercaT";
import { Utente } from "../models/UtenteT";

export class UtenteService {
    private readonly utenteDAO: UtenteDAO;
    private readonly ricercaDAO: RicercaDAO;
    constructor(utenteDAO: UtenteDAO, ricercaDAO: RicercaDAO) {
        this.utenteDAO = utenteDAO;
        this.ricercaDAO = ricercaDAO;
    }
  
    public async getUtenteById(id: number) : Promise<Utente>{
        const data = await this.utenteDAO?.findById(id);
        return data || Promise.reject(); 
    }

    public async getUtenteByAuth(id: number) : Promise<Utente>{
        const data = await this.utenteDAO.findByAuth(id);
        return data || Promise.reject(); 
    }

    public async register(utente: Utente) {
        await this.utenteDAO.create(utente);
    }

    public async getSearchesUtente(id: number) : Promise<Ricerca[]>{
        const data = await this.ricercaDAO?.findLatest(id);
        return data || Promise.reject();
    }

    public async insertSearches(utenteId: number, searches: Ricerca[]) : Promise<void>{
        await this.ricercaDAO?.removeOfUser(utenteId);
        await this.ricercaDAO?.createOfUser(utenteId, searches);
    }

    public async updateInfo(id: number, nome: string, cognome: string) : Promise<void> {
        try {
            const utente = await this.utenteDAO.findByAuth(id);
            if(!utente) {
                return Promise.reject("Utente non trovato");
            }
            await this.utenteDAO.updateInfo({...utente, nome: nome, cognome: cognome});
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async updateImage(id: number, image: string) : Promise<string | undefined> {
        try {
            const utente = await this.utenteDAO.findByAuth(id);
            const oldUrl = utente?.image;
            if(!utente) {
                return Promise.reject("Utente non trovato");
            }
            await this.utenteDAO.updateInfo({...utente, image});
            return oldUrl;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}