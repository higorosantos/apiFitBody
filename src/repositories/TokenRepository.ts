import Token,{ IToken } from '../models/Token';

class TokenRepository{
    
    async create(data:IToken){
        const  { token, userId } = data;
        const modelToken = await Token.create({
            userId,
            token
        })

        return await modelToken.save();
    }

    async get(token:string){
        return await Token.findOne({token});
    }

    async delete(id:string){
        return await Token.findByIdAndDelete(id);
    }

}

export default new TokenRepository();