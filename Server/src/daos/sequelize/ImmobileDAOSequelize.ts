import { ImmobileDAO } from "../interfaces/ImmobileDAO";
import {Immobile as ImmobileT} from "../../models/ImmobileT";
import Immobile from "../../sequelize/models/Immobile";
import { Op } from "sequelize";
import Agente from "../../sequelize/models/Agente";

export class ImmobileDAOSequelize implements ImmobileDAO {
    public async findById(id: number): Promise<ImmobileT | undefined> {
        const data = await Immobile.findByPk(id, {include: [
            {
                model: Agente,
            }
        ]})

        if(data){
            return data.get({plain: true});
        }
        return Promise.reject(new Error("Database error"));
    }

    public async findInRange(minLat: number, maxLat: number, minLon: number, maxLon: number, lat: number, lon: number) : Promise<ImmobileT[]> {
        const data = await Immobile.findAll({
            where: {
                lat: {[Op.between]: [minLat, maxLat]},
                lon: {[Op.between]: [minLon, maxLon]},
            },
            include: {
                model: Agente,
            }
        })

        if(data) {
            return data.map((i) => (i.get({ plain: true })));
        }

        return Promise.reject(new Error("Database error"));
    }

    public async findInRangePaginate(minLat: number, maxLat: number, minLon: number, maxLon: number, lat: number, lon: number, page: number, limit: number, timestamp: string): Promise<ImmobileT[]> {
        const data = await Immobile.findAll({
            where: {
                lat: {[Op.between]: [minLat, maxLat]},
                lon: {[Op.between]: [minLon, maxLon]},
                createdAt: {[Op.lte] : timestamp},
            },
            offset: (page - 1) * limit,
            limit: limit,
            include: {
                model: Agente,
            }
        })

        if(data) {
            return data.map((i) => (i.get({ plain: true })));
        }

        return Promise.reject(new Error("Database error"));
    }
}