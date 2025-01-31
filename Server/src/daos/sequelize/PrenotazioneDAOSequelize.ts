import Prenotazione from "../../sequelize/models/Prenotazione";
import { PrenotazioneDAO } from "../interfaces/PrenotazioneDAO";
import { Prenotazione as PrenotazioneT } from "../../models/PrenotazioneT"
import { Utente as UtenteT } from "../../models/UtenteT"
import { Immobile as ImmobileT } from "../../models/ImmobileT"
import Utente  from "../../sequelize/models/Utente";
import Immobile from "../../sequelize/models/Immobile";
import { Agente as AgenteT } from "../../models/AgenteT";
import { Op, where } from "sequelize";

export class PrenotazioneDAOSequelize implements PrenotazioneDAO {
    public async findById(id: number): Promise<PrenotazioneT | undefined> {
        const data = await Prenotazione.findByPk(id, {
            include: [
                {
                  model: Utente,
                  attributes: ["id", "username", "nome", "cognome", "email", "image"]
                },
                {
                    model: Immobile,
                }
            ]
        });

        if(data){
            return data.get({ plain: true });
        }

        return undefined;
    }

    public async create(prenotazione: PrenotazioneT, immobileId: ImmobileT["id"], agenteId: AgenteT["id"]): Promise<void> {
        try {
            const p = await Prenotazione.create({
                data: prenotazione.data,
                ImmobileId: immobileId,
                AgenteId: agenteId,
            });
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    public async updateUser(prenotazione: PrenotazioneT, utenteId: UtenteT["id"]) : Promise<void> {
        try {
            const p = await Prenotazione.update({UtenteId: utenteId, stato: "Richiesta"}, {where: {
                id: prenotazione.id
            }});
            
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    public async findByUtenteImmobile(utenteId: UtenteT["id"], immobileId: ImmobileT["id"]): Promise<PrenotazioneT | undefined> {
        try {
            const data = await Prenotazione.findOne({ where: {
                UtenteId: utenteId,
                ImmobileId: immobileId,
            }});
            
            return data?.get({plain: true}) || undefined;
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    public async findByImmobileAgente(immobileId: ImmobileT["id"], agenteId: AgenteT["id"]): Promise<PrenotazioneT[] | undefined> {
        try {
            const occupato = await Prenotazione.findAll({ where: {
                stato: {[Op.notIn]: ["Disponibile", "Effettuata"]},
                AgenteId: agenteId,
            }});

            const disponibile = await Prenotazione.findAll({ where: {
                AgenteId: agenteId,
                ImmobileId: immobileId,
                stato: "Disponibile",
                data: {[Op.notIn]: occupato.map((o) => (o.get({plain: true}).data))}
            }})

            return disponibile;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async findByDateImmobile(data: string, immobileId: number): Promise<Prenotazione | undefined> {
        try {
            const prenotazione = await Prenotazione.findOne({where: {
                data: data,
                ImmobileId: immobileId
            }})

            return prenotazione?.get({plain: true});
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
}