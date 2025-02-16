import { ImmobileDAO } from "../daos/interfaces/ImmobileDAO";
import { PrenotazioneDAO } from "../daos/interfaces/PrenotazioneDAO";
import { Agente } from "../models/AgenteT";
import { Prenotazione } from "../models/PrenotazioneT";
import { Utente } from "../models/UtenteT";

export class PrenotazioneService {
    private prenotazioneDAO: PrenotazioneDAO;
    private immobileDAO: ImmobileDAO;
    constructor(prenotazioneDAO: PrenotazioneDAO, immobileDAO: ImmobileDAO) {
        this.prenotazioneDAO = prenotazioneDAO;
        this.immobileDAO = immobileDAO;
    }
  
    public async getPrenotazioneById(id: number) : Promise<Prenotazione>{
        const data = await this.prenotazioneDAO?.findById(id);
        return data || Promise.reject("Not found"); 
    }

    public async insertPrenotazione(prenotazione: Prenotazione, immobileId: number) : Promise<void>{
        const immobile = await this.immobileDAO?.findById(immobileId);
        if(!immobile || !immobile.Agente || !immobile.Agente.id) {
            return Promise.reject("Immobile o Agente non trovato");
        }
        
        await this.prenotazioneDAO?.create(prenotazione, immobileId, immobile.Agente.id);
    }

    public async updatePrenotazioneUtente(data: string, immobileId: number, utenteId: number) {        
        const savedPrenotazione = await this.prenotazioneDAO?.findByDateImmobile(data, immobileId);
        if(!savedPrenotazione){
            return Promise.reject("Prenotazione non trovata");
        }

        if(savedPrenotazione.stato !== "Disponibile") {
            return Promise.reject("Prenotazione non disponibile");
        }

        const otherPrenotazioni = await this.prenotazioneDAO?.findByUtenteImmobile(utenteId, immobileId);
        if(otherPrenotazioni){
            return Promise.reject("Prenotazione per l'immobile già effettuata dall'utente");
        }
        
        return await this.prenotazioneDAO?.updateUser(savedPrenotazione, utenteId);
    }

    public async acceptPrenotazione(prenotazioneId: number) {        
        const savedPrenotazione = await this.prenotazioneDAO.findById(prenotazioneId);
        if(!savedPrenotazione){
            return Promise.reject("Prenotazione non trovata");
        }

        if(savedPrenotazione.stato !== "Richiesta") {
            return Promise.reject("Prenotazione non disponibile");
        }
        
        return await this.prenotazioneDAO.update({...savedPrenotazione, stato: "Prenotata"});
    }

    public async getPrenotazioneByUtente(utente: Utente){
        const prenotazioni = await this.prenotazioneDAO.findByUtente(utente.id);
        if(!prenotazioni){
            return Promise.reject("Prenotazioni non trovate");
        }
        return prenotazioni;
    }

    public async getPrenotazioneByAgente(agente: Agente){
        const prenotazioni = await this.prenotazioneDAO.findByAgente(agente.id);
        if(!prenotazioni){
            return Promise.reject("Prenotazioni non trovate");
        }
        return prenotazioni;
    }
}