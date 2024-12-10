import { ImmobileDAOMock } from "../daoMock/ImmobileDAOMock";
import { ImmobileDAOSequelize } from "../daoSequelize/ImmobileDAOSequelize";
import { ImmobileDAO } from "./ImmobileDAO";

export class DAOFactory {
    public getImmobileDAO(type: string) : ImmobileDAO | undefined {
        if(type == "Sequelize"){
            return new ImmobileDAOSequelize();
        } else if (type === "mock") {
            return new ImmobileDAOMock();
        }
    }
}