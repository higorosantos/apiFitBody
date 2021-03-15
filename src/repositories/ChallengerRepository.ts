import Challenger,{ IChallenger} from "../models/Challenger"

class ChallengerRepository{
    async create(challenger:IChallenger){
        const { type , description , amount } = challenger; 
        const challengerModel = await Challenger.create({
            type,
            description,
            amount
        });
        
        await challengerModel.save();

        return challengerModel;
    }

    async getAll(){
        const challengers = await Challenger.find();

        return challengers;
    }
}

export default new ChallengerRepository();