import { DAOFactory } from "../daos/factory/DAOFactory";
import { ImmobileDAO } from "../daos/interfaces/ImmobileDAO";
import { PrenotazioneDAO } from "../daos/interfaces/PrenotazioneDAO";
import { RicercaDAO } from "../daos/interfaces/RicercaDAO";
import { UtenteDAO } from "../daos/interfaces/UtenteDAO";
import { Prenotazione } from "../models/PrenotazioneT";
import { Ricerca } from "../models/RicercaT";
import { Utente } from "../models/UtenteT";

export class PrenotazioneService {
    private prenotazioneDAO: PrenotazioneDAO | undefined;
    private immobileDAO: ImmobileDAO | undefined;
    constructor() {
        const factory = new DAOFactory();
        this.prenotazioneDAO = factory.getPrenotazioneDAO(process.env.DAOTYPE || "");
        this.immobileDAO = factory.getImmobileDAO(process.env.DAOTYPE || "")
    }
  
    public async getPrenotazioneById(id: number) : Promise<Utente>{
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

}