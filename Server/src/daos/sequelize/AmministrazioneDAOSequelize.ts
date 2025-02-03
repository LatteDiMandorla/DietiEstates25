import { Amministrazione as AmministrazioneT } from "../../models/AmministrazioneT";
import Amministrazione from "../../sequelize/models/Amministrazione";
import { AmministrazioneDAO } from "../interfaces/AmministrazioneDAO";

export class AmministrazioneDAOSequelize implements AmministrazioneDAO {
    public async findAllByAgenzia(id: number): Promise<AmministrazioneT[]> {
        try {
            const amministratori = await Amministrazione.findAll({ where: { AgenziaId: id } });
            return amministratori?.map((amm) => amm.get({ plain: true }));
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    public async findGestoreByAgenzia(id: number): Promise<AmministrazioneT | undefined> {
        try {
            const amministratore = await Amministrazione.findOne({ where: { AgenziaId: id, ruolo: "GESTORE" } });
            return amministratore?.get({ plain: true });
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    public async create(amministratore: AmministrazioneT): Promise<number> {
        try {
            const created = await Amministrazione.create({
                nome: amministratore.nome,
                cognome: amministratore.cognome,
                AgenziaId: amministratore.Agenzia?.id,
                ruolo: amministratore.ruolo,
                AuthId: amministratore.AuthId,
            });

            return created.get({plain: true}).id;
        } catch (error) {
            return Promise.reject(error)
        }
    }

    public async findById(id: AmministrazioneT["id"]): Promise<AmministrazioneT | undefined> {
        try {
            const amministratore = await Amministrazione.findByPk(id);
            return amministratore?.get({ plain: true });
        } catch (error) {
            return Promise.reject(error)
        }
    }

    public async findByAuth(authId: number): Promise<AmministrazioneT | undefined> {
        try {
            const data = await Amministrazione.findOne({ where: { AuthId: authId } });
            return data?.get({ plain: true });
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    public async updatePassword(id: AmministrazioneT["id"], newPassword: string): Promise<void> {
        try {
            await Amministrazione.update({ password: newPassword }, {
                where: {
                    id
                }
            })
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    }
}