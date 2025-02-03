import { Agenzia as AgenziaT } from "../../models/AgenziaT";
import Agenzia from "../../sequelize/models/Agenzia";
import Amministrazione from "../../sequelize/models/Amministrazione";
import { AgenziaDAO } from "../interfaces/AgenziaDAO";

export class AgenziaDAOSequelize implements AgenziaDAO {
    public async findByAmministrazione(id: number): Promise<AgenziaT | undefined> {
        try {
            const amministratore = await Amministrazione.findOne({
                where: {id: id},
                include: {
                    model: Agenzia,
                    as: "Agenzia"
                },
            })
            return amministratore?.get({plain: true}).Agenzia;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    public async findById(id: number): Promise<AgenziaT | undefined> {
        try {
            const agenzia = await Agenzia.findByPk(id);
            return agenzia?.get({plain: true});
        } catch (error) {
            return Promise.reject(error);
        }
    }
}