import {Request, Response} from 'express';
import User from '../models/User';
import  db from '../db.json';


class UserController{
    async get(req:Request, res:Response):Promise<Response>{
        // const { email, senha} = req.body;
        // const user = db.Users.find( (obj)=>  obj.email == email && obj.senha == senha);
        // console.log(req.body,req.socket.remoteAddress);

        const { email, senha} = req.body;
        console.log(req.body)
        const user = await User.findOne({email,senha});
        console.log(user);

        if(user == undefined){
            return res.status(400).json({message:"login ou senha incorretos"})
        }
        
        //return res.status(200).json({message:"Logado com sucesso!"})
        return res.status(200).json(user);
        
 }

    async getAll(req:Request, res:Response){

    }

    async created(req:Request, res:Response){
        const { name, email, senha} = req.body;

        const user =  await User.create({
            name,
            email,
            senha
        })

        user.save();

        return res.json(user);
    }

    async update(req:Request, res:Response){

    }


}

export { UserController } 