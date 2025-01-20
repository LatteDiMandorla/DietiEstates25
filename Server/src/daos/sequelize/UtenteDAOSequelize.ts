import { Op } from "sequelize";
import { UtenteDAO } from "../interfaces/UtenteDAO";
import { Utente as UtenteT } from "../../models/UtenteT";
import Utente from "../../sequelize/models/Utente";

export class UtenteDAOSequelize implements UtenteDAO {
    public async findById(id: number): Promise<UtenteT | undefined> {
        const data = await Utente.findByPk(id, {attributes: ["username", "email", "nome", "cognome", "image"]});
        if(data){
            return data.dataValues;
        }

        return undefined;
    }

    public async findByEmail(email: string): Promise<UtenteT | undefined> {
        const user = await Utente.findOne({where: {email: email}});
        if(user) {
            return user.dataValues;
        }

        return undefined;
    }

    public async create(user: UtenteT): Promise<void> {
        try {
            const utente = await Utente.findOne({where: {email: user?.email}});
            if(utente) {
                return Promise.reject("email already registered");
            }

            await Utente.create({
                nome: user.nome,
                cognome: user.cognome,
                email: user.email,
                password: user.password,
                image: user.image,
                username: user.username,
            });
        } catch (error) {
            console.log(error)
            return Promise.reject()
        }
    }
}