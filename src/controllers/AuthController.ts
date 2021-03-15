import jwt from 'jsonwebtoken';
import {Request, Response} from 'express';
import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';

class AuthController{
    async authenticate(req:Request, res:Response){
        const { email , pwd } = req.body;

        try{
            const user = await UserRepository.getByEmail(email);

            if(!user){
        
            return res.sendStatus(401);
           
            }
        
            const isValidPwd = await bcrypt.compare(pwd, user.pwd);
            if(!isValidPwd){
                return res.sendStatus(401);
            }

        
            const token = jwt.sign({id:user.id}, `${process.env.JWT_SECRET}`,{expiresIn:'1d'})

            return res.json(token);

        }catch(e){
            return res.sendStatus(401);
        }
        }
}


export default new AuthController();