
import { Request, Response} from 'express';
import Challenger from '../models/Challenger';


class ChallengerController{
    async get(){

    }
    async getAll(req:Request, res:Response){
        const challengers = await Challenger.find();
        return res.status(200).json(challengers)

    }
}

export { ChallengerController } 