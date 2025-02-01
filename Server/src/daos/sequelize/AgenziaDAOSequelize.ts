import { Agenzia as AgenziaT } from "../../models/AgenziaT";
import Agenzia from "../../sequelize/models/Agenzia";
import Amministrazione from "../../sequelize/models/Amministrazione";
import { AgenziaDAO } from "../interfaces/AgenziaDAO";

export class AgenziaDAOSequelize implements AgenziaDAO {
    public async findByAmministrazione(id: number): Promise<AgenziaT | undefined> {
        try {
            const amministratore = await Amministrazione.findOne({
                where: {id},
                include: {model: Agenzia}
            })

            return amministratore?.get({plain: true}).Agenzie;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}