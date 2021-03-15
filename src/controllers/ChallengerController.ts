import { Request, Response} from 'express';
import ChallengerRepository from '../repositories/ChallengerRepository';

class ChallengerController{
    async get(){

    }
    async getAll(req:Request, res:Response){

        const challengers = await ChallengerRepository.getAll();
        return res.status(200).json(challengers)

    }
}

export default  new ChallengerController() 