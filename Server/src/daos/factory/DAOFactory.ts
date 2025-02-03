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

    public getPrenotazioneDAO(type: string) : PrenotazioneDAO | undefined {
        if(type == "Sequelize"){
            return new PrenotazioneDAOSequelize();
        }
    }

    public getAgenteDAO(type: string) : AgenteDAO | undefined {
        if(type == "Sequelize"){
            return new AgenteDAOSequelize();
        }
    }

    public getAmministrazioneDAO(type: string) : AmministrazioneDAO | undefined {
        if(type == "Sequelize"){
            return new AmministrazioneDAOSequelize();
        }
    }

    public getAgenziaDAO(type: string) : AgenziaDAO | undefined {
        if(type == "Sequelize"){
            return new AgenziaDAOSequelize();
        }
    }

    public getAuthDAO(type: string) : AuthDAO | undefined {
        if(type == "Sequelize"){
            return new AuthDAOSequelize();
        }
    }
}