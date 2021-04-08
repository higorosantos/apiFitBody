import bcrypt, { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import aws from 'aws-sdk';
import jwt from 'jsonwebtoken';
import SendEmail from '../services/SendEmail';
import crypto from 'crypto';
import UserRepository from '../repositories/UserRepository';
import ChallengerRepository from '../repositories/ChallengerRepository';
import TokenRepository from '../repositories/TokenRepository';
import User from 'src/models/User';
import { IToken } from 'src/models/Token';

const s3 = new aws.S3();

class UserController {
    

    async get(req: Request, res: Response): Promise<Response> {
        const id = !req.params.id ? req.id : req.params.id;
        console.log(id);
        try {
            const user = await UserRepository.getById(id,['-_id']);
        
            if (!user) {
                return res.status(404).json({ error: "Usuario não encontrado." })
            }

            user.pwd = undefined;
            user._id = undefined;

        

            return res.status(200).json(user);

        } catch (e) {
            return res.status(400).json({error:"Houve um problema na busca deste usuario."});
        }


    }

    async getAll(req: Request, res: Response): Promise<Response> {

        try {
            const users = await UserRepository.getAll();
            return res.status(200).json(users);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;

        try {
            const userAlreadyExist = await UserRepository.getByEmail(email);


            if (userAlreadyExist) {
                return res.status(400).json({ error: "Usuario ja cadastrado." })
            }

            const user = await UserRepository.create(req.body);

            const hash = crypto.randomBytes(8).toString('hex');

            await TokenRepository.create({
                userId:user.id,
                token:hash
            }as IToken);
            
            await SendEmail.send("Verificação de Email",user.email,"higor.santos22@hotmail.com",user.name,hash,"verifyemail");



            return res.status(201).json({"message":"Conta criado com sucesso!"});

        } catch (e) {
            return res.status(400).json(e);
        }

    }

    async update(req: Request, res: Response){
        const { } = req.body;

        const user = await UserRepository.update(req.id,req.body);
        return res.json(user);
    }

    async changePassword(req: Request, res: Response) {

        const { new_pwd, pwd } = req.body

        try {
            const user = await UserRepository.getById(req.id);
            if (!user) {
                return res.sendStatus(404)
            }
            //console.log(user);

            const isValidPwd = await bcrypt.compare(pwd, user.pwd);

            console.log(isValidPwd);

            if (!isValidPwd) {
                return res.status(400).json({ error: "Senha incorreta." });
            }

            user.pwd = await bcrypt.hash(new_pwd, 10);

            UserRepository.update(req.id,user)

            return res.status(200).json({ message: "Senha alterada com sucesso." });

        } catch (e) {
            res.sendStatus(400).json({error:"Houve um erro ao alterar senha."});
        }

    }

    async changeProfileImage(req: Request, res: Response) {
        const { key, location } = req.file;
        try {
            const user = await UserRepository.getById(req.id);

            if (user.profileImage.url) {
                console.log(user.profileImage.key);
                s3.deleteObject({
                    Bucket: process.env.BUCKET_NAME,
                    Key: user.profileImage.key
                }, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                })

            }

            user.profileImage = {
                key: key,
                url: location
            }


            await UserRepository.update(req.id,user);

            return res.sendStatus(200);

        } catch (e) {
            return res.status(400).json({error:"Houve um erro na alteração."});
        }

    }

    async changeName(req:Request, res:Response){
        //const teste = await SendEmail.send("Bem vindo!","ruan.thow3@gmail.com","te499616@gmail.com","ISTO É UM TESTE!");
        const { name } = req.body;
        try{
            const user = await UserRepository.getById(req.id);

            if(!user){
                res.status(404).json({error:"Usuario não existe."})
            }

            user.name = name;

            const result = await UserRepository.update(req.id,user);

            return res.status(200).json({message:"Nome alterado com sucesso."});
    
        }
        catch(e){

            return res.status(400).json({error:"Houve um erro ao alterar o nome."});
        }
        
    }

    async challengerCompleted(req:Request, res:Response){
        const { challengerId:id } = req.body;
        try{

            const challenger = await ChallengerRepository.get(id);
            
            if(!challenger){
                res.status(404).json({error:"Desafio não encontrado."})
            }

            const user = await UserRepository.getById(req.id);

            if(!user){
                res.status(404).json({error:"Usuario não encontrado."})
            }

            user.challengesCompleted.push(challenger.id);
            user.exp = user.exp + challenger.amount;

            await UserRepository.update(req.id,user);
            
            return res.sendStatus(200);

        }catch(e){
            return res.status(400).json({error:"Houve um erro ao completar o desafio."})
        }

    }

    async verify(req:Request,res:Response){
        const { access_account:token }  = req.body;
        

        try{
            const data = await TokenRepository.get(token);

            if(!data){
                return res.status(400).json({"error":"Token invalido!"});
            }

            const user = await UserRepository.getById(data.userId);
            
            if(!user){
                return res.status(400).json({"error":"Usuario não existe."})
            }

            user.active = true;

            await UserRepository.update(user.id,user);
            await TokenRepository.delete(data.id);
            
            return res.status(200).json({"message":"Email verificado com sucesso."});

        }catch(e){
            return res.status(400).json({"error":"Houve um erro ao verificar a conta."});
        }
    }
}

export default new UserController();