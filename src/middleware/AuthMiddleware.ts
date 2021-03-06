import { Request, Response , NextFunction} from 'express';
import jwt from 'jsonwebtoken';


interface Token{
    id:string,
    iat:number,
    exp:number
}


export default function AuthMiddleware(req:Request,res:Response,next:NextFunction){
    
    const { authorization } = req.headers;

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
        return res.sendStatus(401);
    }

}