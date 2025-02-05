import { Agente as AgenteT } from "../../models/AgenteT";
import Agente from "../../sequelize/models/Agente";
import Immobile from "../../sequelize/models/Immobile";
import { AgenteDAO } from "../interfaces/AgenteDAO";

export class AgenteDAOSequelize implements AgenteDAO {
    public async findById(id: number): Promise<AgenteT | undefined> {
        try {
            const data = await Agente.findByPk(id);
            return data?.get({plain: true});
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async findByImmobile(id: number): Promise<AgenteT | undefined> {
        try {
            const data = await Immobile.findByPk(id, {include: Agente});
            return data?.get({plain: true}).Agente;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async findByAuth(authId: number): Promise<AgenteT | undefined> {
        try {
            const data = await Agente.findOne({where: {AuthId: authId}});
            return data?.get({plain: true});
        } catch (error) {
            return Promise.reject(error);
        }
    }
    
    public async create(agente: AgenteT): Promise<void> {
        try {
            await Agente.create({
                nome: agente.nome,
                cognome: agente.cognome,
                image: agente.image,
                AgenziaId: agente.Agenzia?.id,
                AuthId: agente.AuthId,
            });
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    public async updatePassword(id: AgenteT["id"], newPassword: string): Promise<void> {
        try {
            await Agente.update({password: newPassword}, {where: {
                id
            }})
        } catch (error) {
            console.log(error);
            return Promise.reject()
        }
    }
}