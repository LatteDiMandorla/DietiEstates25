import { Op } from "sequelize";
import { UtenteDAO } from "../interfaces/UtenteDAO";
import { Utente as UtenteT } from "../../models/UtenteT";
import Utente from "../../sequelize/models/Utente";

export class UtenteDAOSequelize implements UtenteDAO {
    public async findById(id: number): Promise<UtenteT> {
        const data = await Utente.findByPk(id);
        if(data){
            return data.dataValues;
        }

        return Promise.reject();
    }
}