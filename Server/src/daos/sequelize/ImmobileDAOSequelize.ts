import { ImmobileDAO } from "../interfaces/ImmobileDAO";
import Immobile from "../../models/ImmobileT";

export class ImmobileDAOSequelize implements ImmobileDAO {
    public async findById(id: number): Promise<Immobile> {
        return {id: id, images: [], address: ""};
    }
}