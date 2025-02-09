import { ImmobileDAOSequelize } from "../sequelize/ImmobileDAOSequelize";
import { ImmobileDAO } from "../interfaces/ImmobileDAO";
import { UtenteDAO } from "../interfaces/UtenteDAO";
import { UtenteDAOSequelize } from "../sequelize/UtenteDAOSequelize";
import { RicercaDAOSequelize } from "../sequelize/RicercaDAOSequelize";
import { RicercaDAO } from "../interfaces/RicercaDAO";
import { PrenotazioneDAO } from "../interfaces/PrenotazioneDAO";
import { PrenotazioneDAOSequelize } from "../sequelize/PrenotazioneDAOSequelize";
import { AgenteDAOSequelize } from "../sequelize/AgenteDAOSequelize";
import { AgenteDAO } from "../interfaces/AgenteDAO";
import { AmministrazioneDAO } from "../interfaces/AmministrazioneDAO";
import { AmministrazioneDAOSequelize } from "../sequelize/AmministrazioneDAOSequelize";
import { AgenziaDAO } from "../interfaces/AgenziaDAO";
import { AgenziaDAOSequelize } from "../sequelize/AgenziaDAOSequelize";
import { AuthDAOSequelize } from "../sequelize/AuthDAOSequelize";
import { AuthDAO } from "../interfaces/AuthDAO";

export class DAOFactory {
    public getImmobileDAO(type: string) : ImmobileDAO {
        if(type == "Sequelize"){
            return new ImmobileDAOSequelize();
        }

        throw new Error(`DAO of type ${type} not found`);
    }

    public getUtenteDAO(type: string) : UtenteDAO {
        if(type == "Sequelize"){
            return new UtenteDAOSequelize();
        }

        throw new Error(`DAO of type ${type} not found`);
    }

    public getRicercaDAO(type: string) : RicercaDAO {
        if(type == "Sequelize"){
            return new RicercaDAOSequelize();
        }

        throw new Error(`DAO of type ${type} not found`);
    }

    public getPrenotazioneDAO(type: string) : PrenotazioneDAO {
        if(type == "Sequelize"){
            return new PrenotazioneDAOSequelize();
        }

        throw new Error(`DAO of type ${type} not found`);
    }

    public getAgenteDAO(type: string) : AgenteDAO {
        if(type == "Sequelize"){
            return new AgenteDAOSequelize();
        }

        throw new Error(`DAO of type ${type} not found`);
    }

    public getAmministrazioneDAO(type: string) : AmministrazioneDAO {
        if(type == "Sequelize"){
            return new AmministrazioneDAOSequelize();
        }

        throw new Error(`DAO of type ${type} not found`);

    }

    public getAgenziaDAO(type: string) : AgenziaDAO {
        if(type == "Sequelize"){
            return new AgenziaDAOSequelize();
        }

        throw new Error(`DAO of type ${type} not found`);
    }

    public getAuthDAO(type: string) : AuthDAO {
        if(type == "Sequelize"){
            return new AuthDAOSequelize();
        }

        throw new Error(`DAO of type ${type} not found`);
    }
}