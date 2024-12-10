import Immobile from "../intefaces/ImmobileT.js";

export abstract class ImmobileDAO {
    public abstract getById(id: number) : Promise<Immobile>;
}