import Immobile from "../../models/ImmobileT.js";

export interface ImmobileDAO {
    findById(id: number) : Promise<Immobile>;
}