import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import aws from 'aws-sdk';
import UserRepository from '../repositories/UserRepository';

const s3 = new aws.S3();

class UserController {
    

    async get(req: Request, res: Response): Promise<Response> {

        const id = req.id;

        try {
            const user = await UserRepository.getById(id);

            if (!user) {
                return res.status(400).json({ error: "User not found." })
            }

            return res.status(200).json(user);

        } catch (e) {
            return res.status(404).json(e);
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
                return res.status(400).json({ errr: "User already exist." })
            }

            const user = await UserRepository.create(req.body);

            return res.status(201).json(user);

        } catch (e) {
            return res.status(400).json(e);
        }

    }

    async update(req: Request, res: Response){
        const { } = req.body;

        const user = await UserRepository.update(req.body);
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
                return res.status(400).json({ "msg": "senha incorreta" });
            }

            user.pwd = await bcrypt.hash(new_pwd, 10);

            UserRepository.update(user)

            return res.status(200).json({ "message": "Senha alterada com sucesso!" });

        } catch (e) {
            res.sendStatus(400);
        }

    }

    async changeProfileImage(req: Request, res: Response) {
        const { key, location } = req.file;
        try {
            const user = await UserRepository.getById(req.id);
            console.log(user);

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


            await UserRepository.update(user);

            return res.json(user);

        } catch (e) {
            return res.status(400).json(e);
        }

    }


}

export default new UserController();