import { Agente as AgenteT } from "../../models/AgenteT";
import Agente from "../../sequelize/models/Agente";
import { AgenteDAO } from "../interfaces/AgenteDAO";

export class AgenteDAOSequelize implements AgenteDAO {
    public async findById(id: number): Promise<AgenteT | undefined> {
        try {
            const data = await Agente.findByPk(id);
            return data?.get({plain: true});
        } catch (error) {
            return undefined;
        }
    }

    public async findByEmail(email: string): Promise<AgenteT | undefined> {
        try {
            const data = await Agente.findOne({where: {email}});
            return data?.get({plain: true});
        } catch (error) {
            console.log(error);
            return Promise.reject();
        }
    }
    
    public async create(agente: AgenteT): Promise<void> {
        try {
            const agent = await Agente.findOne({where: {email: agente.email}});
            if(agent) {
                return Promise.reject("email already registered");
            }

            await Agente.create({
                nome: agente.nome,
                cognome: agente.cognome,
                email: agente.email,
                password: agente.password,
                image: agente.image,
            });
        } catch (error) {
            console.log(error)
            return Promise.reject()
        }
    }
}