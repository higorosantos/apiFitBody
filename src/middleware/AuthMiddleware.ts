import { Request, Response , NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import User from 'src/models/User';


interface Token{
    id:string,
    iat:number,
    exp:number
}


export default function AuthMiddleware(req:Request,res:Response,next:NextFunction){
    
    const { authorization } = req.headers;
    console.log(authorization);

    if(!authorization){
        return res.sendStatus(401);
    }
    
    const token = authorization.replace('Bearer','').trim();

    try{
       const data = jwt.verify(token,process.env.JWT_SECRET);
       console.log(data);
        

        const { id } = data as Token;
        req.id = id;

       next();
    }catch(e){
        console.log(e);
        return res.sendStatus(401);
    }

}