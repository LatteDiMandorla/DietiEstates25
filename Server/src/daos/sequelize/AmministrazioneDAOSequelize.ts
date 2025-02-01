import { Amministrazione as AmministrazioneT } from "../../models/AmministrazioneT";
import Amministrazione from "../../sequelize/models/Amministrazione";
import { AmministrazioneDAO } from "../interfaces/AmministrazioneDAO";

export class AmministrazioneDAOSequelize implements AmministrazioneDAO {
    public async findAllByAgenzia(id: number): Promise<AmministrazioneT[]> {
        try {
            const amministratori = await Amministrazione.findAll({where: {AgenziaId: id}});
            return amministratori?.map((amm) => amm.get({plain: true}));
        } catch (error) {
            console.log(error)
            return Promise.reject()
        }
    }

    public async findGestoreByAgenzia(id: number): Promise<AmministrazioneT | undefined> {
        try {
            const amministratore = await Amministrazione.findOne({where: {AgenziaId: id, role: "GESTORE"}});
            return amministratore?.get({plain: true});
        } catch (error) {
            console.log(error)
            return Promise.reject()
        }
    }
    
    public async create(amministratore: AmministrazioneT): Promise<void> {
        try {
            const agent = await Amministrazione.findOne({where: {email: amministratore.email}});
            if(agent) {
                return Promise.reject("email already registered");
            }

            await Amministrazione.create({
                email: amministratore.email,
                password: amministratore.password,
                ruolo: amministratore.ruolo,
                nome: amministratore.nome,
                cognome: amministratore.cognome,
            });
        } catch (error) {
            console.log(error)
            return Promise.reject()
        }
    }

    public async updatePassword(id: AmministrazioneT["id"], newPassword: string): Promise<void> {
        try {
            await Amministrazione.update({password: newPassword}, {where: {
                id
            }})
        } catch (error) {
            console.log(error);
            return Promise.reject()
        }
    }

    public async findByEmail(email: string): Promise<AmministrazioneT | undefined> {
        try {
            const amministratore = await Amministrazione.findOne({where: {
                email,
            }})

            return amministratore?.get({plain: true});
        } catch (error) {
            console.log(error);
            return Promise.reject()
        }
    }
}