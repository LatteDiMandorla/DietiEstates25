import { Op } from "sequelize";
import { UtenteDAO } from "../interfaces/UtenteDAO";
import { Utente as UtenteT } from "../../models/UtenteT";
import Utente from "../../sequelize/models/Utente";

export class UtenteDAOSequelize implements UtenteDAO {
    public async findById(id: number): Promise<UtenteT | undefined> {
        try {
            const data = await Utente.findByPk(id);
            return data?.get({ plain: true });
        } catch (error) {
            return Promise.reject(new Error("Database error"));
        }
    }

    public async findByAuth(authId: number): Promise<UtenteT | undefined> {
        try {
            const data = await Utente.findOne({ where: { AuthId: authId } });
            return data?.get({ plain: true });
        } catch (error) {
            return Promise.reject(new Error("Database error"));
        }
    }

    public async create(user: UtenteT): Promise<number> {
        try {
            const utente = await Utente.create({
                nome: user.nome,
                cognome: user.cognome,
                image: user.image,
                username: user.username,
                AuthId: user.AuthId,
            });

            return utente.get({plain: true}).id;
        } catch (error) {
            console.log(error)
            return Promise.reject(new Error("Database error"))
        }
    }

    public async updatePassword(id: UtenteT["id"], newPassowrd: string): Promise<void> {
        try {
            await Utente.update({ password: newPassowrd }, {
                where: {
                    id,
                }
            })
        } catch (error) {
            console.log(error)
            return Promise.reject(new Error("Database error"))
        }
    }

    public async updateInfo(utente: UtenteT): Promise<void> {
        console.log(utente);
        try {
            await Utente.update({...utente}, {where: {id: utente.id}});
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("Database error"));
        }
    }
}