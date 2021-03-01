import {Request, Response} from 'express';
import  db from '../db.json';


class UserController{
    async get(req:Request, res:Response){
        const { email, senha} = req.body;
        const user = db.Users.find( (obj)=>  obj.email == email && obj.senha == senha);
        console.log(user)

        if(user == undefined){
            return res.json({message:"login ou senha incorretos"})
        }

        return res.json({message:"Logado com sucesso!"})
        
 }

    async getAll(req:Request, res:Response){

    }

    async created(req:Request, res:Response){
        
    }

    async update(req:Request, res:Response){

    }


}

export { UserController } 