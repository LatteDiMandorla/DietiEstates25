import { ImmobileDAOSequelize } from "../sequelize/ImmobileDAOSequelize";
import { ImmobileDAO } from "../interfaces/ImmobileDAO";
import { UtenteDAO } from "../interfaces/UtenteDAO";
import { UtenteDAOSequelize } from "../sequelize/UtenteDAOSequelize";
import { RicercaDAOSequelize } from "../sequelize/RicercaDAOSequelize";
import { RicercaDAO } from "../interfaces/RicercaDAO";

export class DAOFactory {
    public getImmobileDAO(type: string) : ImmobileDAO | undefined {
        if(type == "Sequelize"){
            return new ImmobileDAOSequelize();
        }
    }

    public getUtenteDAO(type: string) : UtenteDAO | undefined {
        if(type == "Sequelize"){
            return new UtenteDAOSequelize();
        }
    }

    public getRicercaDAO(type: string) : RicercaDAO | undefined {
        if(type == "Sequelize"){
            return new RicercaDAOSequelize();
        }
    }
}