import { ImmobileDAO } from "../daos/ImmobileDAO";
import Immobile from "../intefaces/ImmobileT";

export class ImmobileDAOMock extends ImmobileDAO {
    public async getById(id: number): Promise<Immobile> {
        return {id: id, images: [], address: ""};
    }
}