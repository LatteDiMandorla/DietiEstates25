import { ImmobileDAOSequelize } from "../sequelize/ImmobileDAOSequelize";
import { ImmobileDAO } from "../interfaces/ImmobileDAO";

export class DAOFactory {
    public getImmobileDAO(type: string) : ImmobileDAO | undefined {
        if(type == "Sequelize"){
            return new ImmobileDAOSequelize();
        }
    }
}