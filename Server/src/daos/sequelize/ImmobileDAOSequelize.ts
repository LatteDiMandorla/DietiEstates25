import { ImmobileDAO } from "../interfaces/ImmobileDAO";
import {Immobile as ImmobileT} from "../../models/ImmobileT";
import { Immobili } from "../../controllers/immobili";
import Immobile from "../../sequelize/models/Immobile";
import { Op } from "sequelize";

export class ImmobileDAOSequelize implements ImmobileDAO {
    public async findById(id: number): Promise<ImmobileT> {
        const data = await Immobile.findByPk(id);
        if(data){
            return data.get({plain: true});
        }
        return Immobili[0];
    }

    public async findInRange(minLat: number, maxLat: number, minLon: number, maxLon: number, lat: number, lon: number) : Promise<ImmobileT[]> {
        const data = await Immobile.findAll({
            where: {
                lat: {[Op.between]: [minLat, maxLat]},
                lon: {[Op.between]: [minLon, maxLon]},
            }
        })

        if(data) {
            return data.map((i) => (i.get({ plain: true })));
        }

        return Promise.resolve(Immobili.filter((imm) => (imm.lat <= maxLat && imm.lat >= minLat && imm.lon >= minLon && imm.lon <= maxLon)));
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
        })

        if(data) {
            return data.map((i) => (i.get({ plain: true })));
        }

        return Promise.resolve(Immobili.filter((imm) => (imm.lat <= maxLat && imm.lat >= minLat && imm.lon >= minLon && imm.lon <= maxLon)));
    }
}