import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';

class AuthController{
    async authenticate(req:Request, res:Response,next:NextFunction){
        const { email , pwd } = req.body;

        try{
            const user = await UserRepository.getByEmail(email,['+pwd','+active']);
        

            if(!user){
        
            return res.sendStatus(401);
           
            }
        
            const isValidPwd = await bcrypt.compare(pwd, user.pwd);
            
            if(!isValidPwd){
                return res.sendStatus(401);
            }

            if(!user.active){
                return res.status(401).json({"error":"Email não verificado!"});
            }
        
            const token = jwt.sign({id:user.id}, `${process.env.JWT_SECRET}`,{expiresIn:process.env.TOKEN_VALID})
            
            user.pwd = undefined;
            user.active = undefined;
            

            return res.json({token:token});
            
            

        }catch(e){

            return res.sendStatus(401).json(e);
        }
    }
}


export default new AuthController();