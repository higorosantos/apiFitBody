import {Request, Response} from 'express';
import UserRepository from '../repositories/UserRepository'

class UserController{

    async authenticate(req:Request, res:Response){
        // const { email, pwd} = req.body;
        // console.log(req.body)
        // const user = await User.findOne({email}).select(+pwd);
        // console.log(user);

        // if(user == undefined){
        //     return res.status(400).json({message:"login ou senha incorretos"})
        // }
        
        // //return res.status(200).json({message:"Logado com sucesso!"})
        // return res.status(200).json(user);

    }
    async get(req:Request, res:Response):Promise<Response>{
         
        const { id } = req.body;

        try{
            const user = await UserRepository.getById(id);

            if(!user){
                return res.status(400).json({ error:"User not found."})
            }

            return res.status(200).json(user);

        }catch(e){
            return res.status(400).json(e);
        }
        
        
    }

    async getAll(req:Request, res:Response):Promise<Response>{
        
        try{
            const users = await UserRepository.getAll();
            return res.status(200).json(users);
        }catch(e){
            return res.status(400).json(e);
        }
    }

    async create(req:Request, res:Response):Promise<Response>{
        const { email } = req.body;

        try{
            const userAlreadyExist = await UserRepository.getByEmail(email);
            
            console.log(userAlreadyExist)

            if(userAlreadyExist){
                return res.status(400).json({errr:"User already exist."})
            }

            const user = await UserRepository.create(req.body);

            return res.status(201).json(user);
            
        }catch(e){
            return res.status(400).json(e);
        }
        
    }

    async update(req:Request, res:Response){

    }


}

export { UserController } 