import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';

class AuthController{
    async authenticate(req:Request, res:Response,next:NextFunction){
        const { email , pwd } = req.body;

        try{
            const user = await UserRepository.getByEmail(email);
            console.log(user);

            if(!user){
        
            return res.sendStatus(401);
           
            }
        
            const isValidPwd = await bcrypt.compare(pwd, user.pwd);
            
            if(!isValidPwd){
                return res.sendStatus(401);
            }

        
            const token = jwt.sign({id:user.id}, `${process.env.JWT_SECRET}`,{expiresIn:process.env.TOKEN_VALID})
            
            next();
            return res.json({user,token:token});
            
            

        }catch(e){
            next();
            return res.sendStatus(401).json(e);
        }
        }
}


export default new AuthController();