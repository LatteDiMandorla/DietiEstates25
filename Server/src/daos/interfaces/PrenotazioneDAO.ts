import { Agente } from "../../models/AgenteT";
import { Immobile } from "../../models/ImmobileT";
import { Prenotazione } from "../../models/PrenotazioneT";
import { Utente } from "../../models/UtenteT";

export interface PrenotazioneDAO {
    findById(id: number): Promise<Prenotazione | undefined>;
    findByUtenteImmobile(utenteId: Utente["id"], immobileId: Immobile["id"]): Promise<Prenotazione | undefined>;
    findByUtente(utenteId: Utente["id"]): Promise<Prenotazione[]>;
    findByAgente(utenteId: Agente["id"]): Promise<Prenotazione[]>;
    updateUser(prenotazione: Prenotazione, utenteId: Utente["id"]) : Promise<void>;
    update(prenotazione: Prenotazione) : Promise<void>;
    create(prenotazione: Prenotazione, immobileId: Immobile["id"], agenteId: Agente["id"]) : Promise<void>;
    findByImmobileAgente(immobileId: Immobile["id"], agenteId: Agente["id"]): Promise<Prenotazione[] | undefined>;
    findByDateImmobile(data: string, immobileId: number): Promise<Prenotazione | undefined>;
}