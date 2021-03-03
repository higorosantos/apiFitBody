import {Request, Response} from 'express';
import  db from '../db.json';


class UserController{
    async get(req:Request, res:Response):Promise<Response>{
        const { email, senha} = req.body;
        const user = db.Users.find( (obj)=>  obj.email == email && obj.senha == senha);
        console.log(req.body,req.socket.remoteAddress);

        if(user == undefined){
            return res.status(400).json({message:"login ou senha incorretos"})
        }

        return res.status(200).json({message:"Logado com sucesso!"})
        
 }

    async getAll(req:Request, res:Response){

    }

    async created(req:Request, res:Response){
        
    }

    async update(req:Request, res:Response){

    }


}

export { UserController } 