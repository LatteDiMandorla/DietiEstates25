import { Op } from "sequelize";
import { UtenteDAO } from "../interfaces/UtenteDAO";
import { Ricerca as RicercaT } from "../../models/RicercaT";
import Utente from "../../sequelize/models/Utente";
import { RicercaDAO } from "../interfaces/RicercaDAO";
import Ricerca from "../../sequelize/models/Ricerca";

export class RicercaDAOSequelize implements RicercaDAO {
    public async findLatest(userId: number): Promise<RicercaT[]> {
        const data = await Ricerca.findAll({
            order: [["createdAt", "DESC"]],
            limit: 5,
            where: {UtenteId: userId}
        });

        if(data){
            return data.map((i) => (i.get({ plain: true })));
        }
        
        return Promise.reject();
    }
}