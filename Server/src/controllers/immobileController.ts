import { Request, Response } from "express";
import { DAOFactory } from "../daos/factory/DAOFactory";
import { ImmobileDAO } from "../daos/interfaces/ImmobileDAO";

export class ImmobileController {
    private ImmobileDAO : ImmobileDAO | undefined;

    constructor() {
        const daoFactory = new DAOFactory();
        this.ImmobileDAO = daoFactory.getImmobileDAO(process.env.DAOTYPE || "mock");
    }

    public async getById(req : Request, res : Response) : Promise<void> {
        const id : number = parseInt(req.params.id);
        if(!id) {
            res.status(400).send("Id not valid"); 
            return;
        }

        const immobile = await this.ImmobileDAO?.findById(id);
        if(!immobile) {
            res.status(404).send("Immobile not found"); 
            return;
        }

        res.json(immobile);
    }
}