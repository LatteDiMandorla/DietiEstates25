import { ImmobileDAO } from "../daos/ImmobileDAO";
import Immobile from "../intefaces/ImmobileT";

export class ImmobileDAOSequelize extends ImmobileDAO {
    public override async getById(id: number): Promise<Immobile> {
        return {id: id, images: [], address: ""};
    }
}