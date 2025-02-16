import { Auth as AuthT, Role } from "../../models/AuthT";
import Agente from "../../sequelize/models/Agente";
import Amministrazione from "../../sequelize/models/Amministrazione";
import Auth from "../../sequelize/models/Auth";
import Utente from "../../sequelize/models/Utente";
import { AuthDAO } from "../interfaces/AuthDAO";

export class AuthDAOSequelize implements AuthDAO {
    public async create(auth: AuthT): Promise<number> {
        try {
            const created = await Auth.create({
                email: auth.email,
                password: auth.password,
                ruolo: auth.ruolo,
                verified: auth.verified,
            });

            return created.id;
        } catch (error) {
            return Promise.reject(new Error("Database error"));
        }
    }

    private getModelFromRole(role: Role) {
        if(role == "CLIENTE") {
            return Utente;
        } else if (role === "AGENTE") {
            return Agente;
        } else {
            return Amministrazione;
        }
    }

    public async findInfoByRole(id: number, role: Role): Promise<any> {
        try {
            const auth = await Auth.findByPk(id, {
                include: {
                    model: this.getModelFromRole(role),
                    as: "info",
                }
            });
            return auth?.get({plain: true}).info;
        } catch (error) {
            return Promise.reject(new Error("Database error"));
        }
    }

    public async findByEmail(email: string): Promise<AuthT | undefined> {
        try {
            const auth = await Auth.findOne({ where: { email } });

            return auth?.get({ plain: true });
        } catch (error) {
            return Promise.reject(new Error("Database error"));
        }
    }

    public async update(id: number, newPassword: string): Promise<void> {
        try {
            await Auth.update({password: newPassword}, {where: {id}});
        } catch (error) {
            return Promise.reject(new Error("Database error"));
        }
    }

    public async verify(id: number): Promise<void> {
        try {
            await Auth.update({verified: true}, {where: {id}});
        } catch (error) {
            return Promise.reject(new Error("Database error"));
        }
    }

    public async findById(id: number): Promise<AuthT | undefined> {
        try {
            const auth = await Auth.findByPk(id);
            return auth?.get({plain: true});
        } catch (error) {
            return Promise.reject(new Error("Database error"));
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            await Auth.destroy({where: {id}});
        } catch (error) {
            return Promise.reject(new Error("Database error"));
        }
    }
}